import { NextRequest, NextResponse } from 'next/server';
import { getAllPrompts, createPrompt } from '@/lib/db';
import { z } from 'zod';

const promptSchema = z.object({
  id: z.string(),
  title: z.object({
    en: z.string(),
    zh: z.string(),
  }),
  description: z.object({
    en: z.string(),
    zh: z.string(),
  }),
  usage: z.object({
    en: z.string(),
    zh: z.string(),
  }),
  prompt: z.string(),
  category: z.string(),
  tags: z.array(z.string()),
  imageUrl: z.string(),
});

export async function GET() {
  try {
    const prompts = await getAllPrompts();
    return NextResponse.json(prompts);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch prompts' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = promptSchema.parse(body);

    const newPrompt = await createPrompt(validatedData);
    return NextResponse.json(newPrompt, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Invalid data', details: error.errors }, { status: 400 });
    }
    return NextResponse.json({ error: 'Failed to create prompt' }, { status: 500 });
  }
}
