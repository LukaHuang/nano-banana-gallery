/**
 * Script to remove prompts without valid images
 */

import * as fs from 'fs';
import * as path from 'path';

interface PromptDB {
  id: string;
  imageUrl: string;
  sourceId?: string;
  [key: string]: any;
}

async function removePromptsWithoutImages() {
  try {
    // Read the current database
    const dbPath = path.join(process.cwd(), 'data', 'prompts-db.json');
    const prompts: PromptDB[] = JSON.parse(fs.readFileSync(dbPath, 'utf-8'));

    const originalCount = prompts.length;

    // Filter out prompts from awesome-nano-banana that don't have real images
    const filteredPrompts = prompts.filter(prompt => {
      // Keep all prompts that are not from awesome-nano-banana
      if (prompt.sourceId !== 'awesome-nano-banana') {
        return true;
      }

      // For awesome-nano-banana prompts, only keep those with real images
      const hasRealImage =
        prompt.imageUrl.includes('githubusercontent.com') ||
        prompt.imageUrl.includes('bibigpt-apps.chatvid.ai') ||
        prompt.imageUrl.includes('cdn.jsdelivr.net');

      if (!hasRealImage) {
        console.log(`❌ Removing: ${prompt.id}`);
      }

      return hasRealImage;
    });

    const removedCount = originalCount - filteredPrompts.length;

    // Write back to database
    fs.writeFileSync(dbPath, JSON.stringify(filteredPrompts, null, 2), 'utf-8');

    console.log(`\n✅ Removed ${removedCount} prompts without images`);
    console.log(`📊 Remaining prompts: ${filteredPrompts.length}`);

  } catch (error) {
    console.error('Error removing prompts:', error);
  }
}

// Run the removal
removePromptsWithoutImages();
