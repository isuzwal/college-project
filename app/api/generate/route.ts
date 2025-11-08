import { NextRequest, NextResponse } from 'next/server';
import { getGroqChatCompletion } from '@/lib/groq';
import { createComponentPrompt } from '@/lib/groq/prompt';

export async function POST(request: NextRequest) {
  try {
    // came from the user Request
    const { buttons ,userPrompt} = await request.json();
    
    const prompt = createComponentPrompt(userPrompt);
    const completion = await getGroqChatCompletion(prompt);
    const code = completion.choices[0]?.message?.content || "";
    
    return NextResponse.json({ code });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Failed to generate' }, { status: 500 });
  }
}