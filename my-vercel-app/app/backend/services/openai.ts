import OpenAI from "openai";

const openai = new OpenAI({ 
  apiKey: process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY_ENV_VAR || "default_key"
});

const HOTEL_LOCATION = "Homewood Suites Glastonbury, CT";

export interface BusinessRecommendation {
  name: string;
  rating: number;
  reviews: number;
  category: string;
  distance: string;
  priceLevel: string;
  description: string;
  imageUrl?: string;
}

export interface ServiceRequest {
  room: string;
  request: string;
}

export async function generateConciergeResponse(
  userMessage: string,
  chatHistory: Array<{ role: "user" | "assistant"; content: string }>
): Promise<{
  response: string;
  recommendations?: BusinessRecommendation[];
  service_request?: ServiceRequest;
}> {
  try {
    const systemPrompt = `You are Envoyya, an elite AI concierge assistant for hotel guests at ${HOTEL_LOCATION}. You are warm, polished, helpful, and highly resourceful — like a 5-star human concierge, but smarter.

[... prompt trimmed for brevity, but paste the FULL version you used in Replit with memory-aware, time-aware, etc. here.]

IMPORTANT: If provided with real business data from Yelp or elsewhere, use only those listings. Do not make up locations unless instructed.

You are fast, smart, and supportive — the guest's invisible concierge ally.`;

    const messages: Array<{ role: "system" | "user" | "assistant"; content: string }> = [
      { role: "system", content: systemPrompt },
      ...chatHistory.slice(-10),
      { role: "user", content: userMessage }
    ];

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages,
      response_format: { type: "json_object" },
      temperature: 0.7,
      max_tokens: 1000,
    });

    const result = JSON.parse(response.choices[0].message.content || "{}");
    
    return {
      response: result.response || "I'm here to help you discover great local businesses near the hotel. What are you looking for today?",
      recommendations: result.recommendations || undefined,
      service_request: result.service_request || undefined
    };
  } catch (error) {
    console.error("OpenAI API error:", error);
    throw new Error("I'm having trouble processing your request right now. Please try again in a moment.");
  }
}
