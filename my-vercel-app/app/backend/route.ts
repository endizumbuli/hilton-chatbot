import type { Express } from "express";
import { createServer, type Server } from "http";
import { WebSocketServer, WebSocket } from "ws";
import { storage } from "./storage";
import { generateConciergeResponse } from "./services/openai";
import { insertChatMessageSchema } from "./shared/schema";
import { randomUUID } from "crypto";

export async function registerRoutes(app: Express): Promise<Server> {
  const httpServer = createServer(app);

  // WebSocket server for real-time chat
  const wss = new WebSocketServer({ server: httpServer, path: '/ws' });

  wss.on('connection', (ws: WebSocket) => {
    console.log('Client connected to chat');
    
    // Generate session ID for this connection
    const sessionId = randomUUID();
    
    // Send welcome message
    const welcomeMessage = {
      type: 'message',
      data: {
        id: randomUUID(),
        role: 'assistant',
        content: "Good morning Tom, I'm your AI concierge for this stay! Is there anything you need or any questions that you may have?",
        timestamp: new Date().toISOString(),
        sessionId
      }
    };
    
    if (ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify(welcomeMessage));
    }

    ws.on('message', async (data) => {
      try {
        const message = JSON.parse(data.toString());
        
        if (message.type === 'chat') {
          const { content } = message.data;
          
          // Store user message
          await storage.createChatMessage({
            sessionId,
            role: 'user',
            content
          });

          // Send typing indicator
          if (ws.readyState === WebSocket.OPEN) {
            ws.send(JSON.stringify({ type: 'typing', data: { isTyping: true } }));
          }

          // Get chat history for context
          const chatHistory = await storage.getChatMessages(sessionId);
          const historyForAI = chatHistory.map(msg => ({
            role: msg.role,
            content: msg.content
          }));

          // Generate AI response
          const aiResult = await generateConciergeResponse(content, historyForAI);
          
          // Handle service request if present
          if (aiResult.service_request) {
            const serviceRequest = await storage.createServiceRequest({
              sessionId,
              room: aiResult.service_request.room,
              request: aiResult.service_request.request,
              status: "pending"
            });
            
            console.log(`🏨 Service Request Created: Room ${serviceRequest.room} - ${serviceRequest.request} (ID: ${serviceRequest.id})`);
          }

          // Store AI response
          const aiMessage = await storage.createChatMessage({
            sessionId,
            role: 'assistant',
            content: aiResult.response,
            recommendations: aiResult.recommendations
          });

          // Send AI response
          if (ws.readyState === WebSocket.OPEN) {
            ws.send(JSON.stringify({ 
              type: 'typing', 
              data: { isTyping: false } 
            }));
            
            ws.send(JSON.stringify({
              type: 'message',
              data: {
                id: aiMessage.id,
                role: 'assistant',
                content: aiResult.response,
                recommendations: aiResult.recommendations,
                timestamp: aiMessage.timestamp.toISOString(),
                sessionId
              }
            }));
          }
        }
      } catch (error) {
        console.error('WebSocket message error:', error);
        if (ws.readyState === WebSocket.OPEN) {
          ws.send(JSON.stringify({
            type: 'error',
            data: { message: 'Sorry, I encountered an error processing your message. Please try again.' }
          }));
        }
      }
    });

    ws.on('close', () => {
      console.log('Client disconnected from chat');
    });

    ws.on('error', (error) => {
      console.error('WebSocket error:', error);
    });
  });

  // REST API endpoints
  app.get('/api/chat/history/:sessionId', async (req, res) => {
    try {
      const { sessionId } = req.params;
      const messages = await storage.getChatMessages(sessionId);
      res.json(messages);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch chat history' });
    }
  });

  // Service requests endpoints
  app.get('/api/service-requests', async (req, res) => {
    try {
      const sessionId = req.query.sessionId as string;
      const requests = await storage.getServiceRequests(sessionId);
      res.json(requests);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch service requests' });
    }
  });

  return httpServer;
}
