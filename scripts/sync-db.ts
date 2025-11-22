/**
 * Script to sync prompts.ts to prompts-db.json
 * Preserves existing image URLs if they differ from the default placeholder
 */

import * as fs from 'fs';
import * as path from 'path';
import { prompts } from '../data/prompts';

async function syncDatabase() {
  try {
    const now = new Date().toISOString();
    const dbPath = path.join(process.cwd(), 'data', 'prompts-db.json');

    // Read existing DB to preserve image URLs
    let existingPrompts: any[] = [];
    if (fs.existsSync(dbPath)) {
      try {
        existingPrompts = JSON.parse(fs.readFileSync(dbPath, 'utf-8'));
      } catch (e) {
        console.log('Could not read existing DB, starting fresh.');
      }
    }

    const imageMap = new Map<string, string>();
    const DEFAULT_IMAGE = 'https://pub-75de598aba1c45faa2b7c57c5f262f78.r2.dev/assets3/prompts-202511221026.webp';

    existingPrompts.forEach(p => {
      // Preserve if it's not the default placeholder
      if (p.imageUrl && p.imageUrl !== DEFAULT_IMAGE) {
        imageMap.set(p.id, p.imageUrl);
      }
    });

    // Sync prompts, preserving images
    const promptsWithTimestamps = prompts.map(prompt => {
      let imageUrl = prompt.imageUrl;

      // If we have a preserved image in DB, use it
      if (imageMap.has(prompt.id)) {
        imageUrl = imageMap.get(prompt.id)!;
      }

      return {
        ...prompt,
        imageUrl,
        createdAt: now,
        updatedAt: now,
      };
    });

    // Write to prompts-db.json
    fs.writeFileSync(dbPath, JSON.stringify(promptsWithTimestamps, null, 2), 'utf-8');

    console.log(`✅ Successfully synced ${promptsWithTimestamps.length} prompts to prompts-db.json (preserved ${imageMap.size} custom images)`);

  } catch (error) {
    console.error('Error syncing database:', error);
  }
}

// Run the sync
syncDatabase();
