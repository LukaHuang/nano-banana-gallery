import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read the prompts-db.json file
const dbFile = path.join(__dirname, '../data/prompts-db.json');
const prompts = JSON.parse(fs.readFileSync(dbFile, 'utf-8'));

// Add sourceId to all prompts
const updatedPrompts = prompts.map(prompt => ({
  ...prompt,
  sourceId: 'nanobana'
}));

// Write back to the file
fs.writeFileSync(dbFile, JSON.stringify(updatedPrompts, null, 2), 'utf-8');

console.log(`✅ Added sourceId to ${updatedPrompts.length} prompts`);
