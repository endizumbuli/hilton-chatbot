import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! })

export async function POST(req: Request) {
  console.log('📩 Received POST to /api/extract-guest-request');
  try {
    const { message } = await req.json()

    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: 'Extract the room number and request note from guest message and return it as JSON. Example: {"room_number":"312","note":"extra towels"}',
        },
        {
          role: 'user',
          content: message,
        },
      ],
      response_format: 'json',
    } as any)

    const extracted = JSON.parse(completion.choices[0].message.content || '{}')

   console.log('🧪 Extracted Response:', extracted);
console.log('🏨 Room:', extracted.room_number, '📝 Note:', extracted.note);
    const { error: insertError, data: insertResult } = await supabase
      .from('guest_requests')
      .insert([
        {
          room_number: extracted.room_number,
          type: 'housekeeping',
          hotel_id: 'cd29dc6f-48b9-4517-a41e-0fb552d83e0b', // your hotel ID
          status: 'pending',
        },
      ])

    if (insertError) {
      console.error('❌ Supabase insert error:', insertError)
      return NextResponse.json({ success: false, error: 'Database insert failed' }, { status: 500 })
    }

    console.log('✅ Insert Result:', insertResult)
    return NextResponse.json({ success: true, data: extracted })

  } catch (err) {
    console.error('❌ Server error:', err)
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 })
  }
}
