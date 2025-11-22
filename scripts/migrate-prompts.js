const fs = require('fs');
const path = require('path');

// Import the prompts data
const { prompts } = require('../data/prompts.ts');

const now = new Date().toISOString();

// Add timestamps to each prompt
const promptsWithTimestamps = prompts.map(prompt => ({
  ...prompt,
  createdAt: now,
  updatedAt: now,
}));

// Write to database file
const dbFile = path.join(__dirname, '../data/prompts-db.json');
fs.writeFileSync(dbFile, JSON.stringify(promptsWithTimestamps, null, 2), 'utf-8');

console.log(`✅ Migrated ${promptsWithTimestamps.length} prompts to prompts-db.json`);
