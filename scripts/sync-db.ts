/**
 * Script to sync prompts.ts to prompts-db.json
 */

import * as fs from 'fs';
import * as path from 'path';
import { prompts } from '../data/prompts';

async function syncDatabase() {
  try {
    const now = new Date().toISOString();

    // Add timestamps to all prompts
    const promptsWithTimestamps = prompts.map(prompt => ({
      ...prompt,
      createdAt: now,
      updatedAt: now,
    }));

    // Write to prompts-db.json
    const dbPath = path.join(process.cwd(), 'data', 'prompts-db.json');
    fs.writeFileSync(dbPath, JSON.stringify(promptsWithTimestamps, null, 2), 'utf-8');

    console.log(`✅ Successfully synced ${promptsWithTimestamps.length} prompts to prompts-db.json`);

  } catch (error) {
    console.error('Error syncing database:', error);
  }
}

// Run the sync
syncDatabase();
