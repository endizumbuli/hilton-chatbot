import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content:
            "You are a helpful hotel concierge at a Hilton property. Speak in a polite, clear, and professional tone. You assist with common guest needs like towels, breakfast orders, or general hotel questions.",
        },
        ...messages,
      ],
    });

    const reply = completion.choices[0]?.message?.content;
    return NextResponse.json({ reply });
  } catch (error) {
    console.error('Chat API Error:', error);
    return NextResponse.json(
      { error: 'Failed to generate a response' },
      { status: 500 }
    );
  }
}
