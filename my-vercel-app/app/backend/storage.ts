import {
  type User,
  type InsertUser,
  type ChatMessage,
  type InsertChatMessage,
  type ServiceRequest,
  type InsertServiceRequest,
} from "./shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  getChatMessages(sessionId: string): Promise<ChatMessage[]>;
  createChatMessage(message: InsertChatMessage): Promise<ChatMessage>;

  getServiceRequests(sessionId?: string): Promise<ServiceRequest[]>;
  createServiceRequest(request: InsertServiceRequest): Promise<ServiceRequest>;
}

export class MemStorage implements IStorage {
  private users = new Map<string, User>();
  private chatMessages = new Map<string, ChatMessage[]>();
  private serviceRequests: ServiceRequest[] = [];

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find((user) => user.username === username);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getChatMessages(sessionId: string): Promise<ChatMessage[]> {
    return this.chatMessages.get(sessionId) || [];
  }

  async createChatMessage(insertMessage: InsertChatMessage): Promise<ChatMessage> {
    const id = randomUUID();
    const message: ChatMessage = {
      ...insertMessage,
      id,
      timestamp: new Date(),
      recommendations: insertMessage.recommendations || null,
    };

    if (!this.chatMessages.has(insertMessage.sessionId)) {
      this.chatMessages.set(insertMessage.sessionId, []);
    }

    this.chatMessages.get(insertMessage.sessionId)!.push(message);
    return message;
  }

  async getServiceRequests(sessionId?: string): Promise<ServiceRequest[]> {
    if (sessionId) {
      return this.serviceRequests.filter((req) => req.sessionId === sessionId);
    }
    return this.serviceRequests;
  }

  async createServiceRequest(insertRequest: InsertServiceRequest): Promise<ServiceRequest> {
    const id = randomUUID();
    const request: ServiceRequest = {
      ...insertRequest,
      id,
      timestamp: new Date(),
      status: insertRequest.status || "pending",
    };

    this.serviceRequests.push(request);
    return request;
  }
}

export const storage = new MemStorage();
