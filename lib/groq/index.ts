import Groq from "groq-sdk";

interface ButtonData {
  id: string;
  type: string;
  position: { x: number; y: number };
  props: { text: string; variant: string };
}
// AI  Call

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY as string });
export async function getGroqChatCompletion(prompt:string) {
  return groq.chat.completions.create({
    messages: [
      {
        role: "user",
        content:prompt
      },
    ],
    model: "llama-3.1-8b-instant",
  });
}

// Prompt  
