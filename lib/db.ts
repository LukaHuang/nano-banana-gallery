import fs from 'fs/promises';
import path from 'path';
import { Prompt } from '@/data/prompts';

const DB_FILE = path.join(process.cwd(), 'data', 'prompts-db.json');

export interface PromptDB extends Prompt {
  createdAt: string;
  updatedAt: string;
}

export async function getAllPrompts(): Promise<PromptDB[]> {
  try {
    const data = await fs.readFile(DB_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    // If file doesn't exist, return empty array
    return [];
  }
}

export async function getPromptById(id: string): Promise<PromptDB | null> {
  const prompts = await getAllPrompts();
  return prompts.find((p) => p.id === id) || null;
}

export async function createPrompt(prompt: Omit<PromptDB, 'createdAt' | 'updatedAt'>): Promise<PromptDB> {
  const prompts = await getAllPrompts();
  const now = new Date().toISOString();

  const newPrompt: PromptDB = {
    ...prompt,
    createdAt: now,
    updatedAt: now,
  };

  prompts.push(newPrompt);
  await fs.writeFile(DB_FILE, JSON.stringify(prompts, null, 2), 'utf-8');

  return newPrompt;
}

export async function updatePrompt(id: string, data: Partial<Omit<PromptDB, 'id' | 'createdAt' | 'updatedAt'>>): Promise<PromptDB | null> {
  const prompts = await getAllPrompts();
  const index = prompts.findIndex((p) => p.id === id);

  if (index === -1) return null;

  const updatedPrompt: PromptDB = {
    ...prompts[index],
    ...data,
    updatedAt: new Date().toISOString(),
  };

  prompts[index] = updatedPrompt;
  await fs.writeFile(DB_FILE, JSON.stringify(prompts, null, 2), 'utf-8');

  return updatedPrompt;
}

export async function deletePrompt(id: string): Promise<boolean> {
  const prompts = await getAllPrompts();
  const filteredPrompts = prompts.filter((p) => p.id !== id);

  if (filteredPrompts.length === prompts.length) return false;

  await fs.writeFile(DB_FILE, JSON.stringify(filteredPrompts, null, 2), 'utf-8');
  return true;
}
