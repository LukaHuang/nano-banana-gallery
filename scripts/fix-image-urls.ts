/**
 * Script to fix image URLs for awesome-nano-banana prompts
 * by fetching them from the GitHub repository
 */

import * as fs from 'fs';
import * as path from 'path';

interface PromptDB {
  id: string;
  imageUrl: string;
  sourceId?: string;
  [key: string]: any;
}

async function fixImageUrls() {
  try {
    // Read the current database
    const dbPath = path.join(process.cwd(), 'data', 'prompts-db.json');
    const prompts: PromptDB[] = JSON.parse(fs.readFileSync(dbPath, 'utf-8'));

    // Fetch the README from GitHub to get image URLs
    const readmeUrl = 'https://raw.githubusercontent.com/JimmyLv/awesome-nano-banana/main/README.md';
    const response = await fetch(readmeUrl);
    const markdown = await response.text();

    // Extract image URLs from markdown
    const imageMap = new Map<number, string>();

    // Pattern to match case sections with images
    const casePattern = /### Case (\d+):[\s\S]*?!\[.*?\]\((https:\/\/[^\)]+\.(?:jpg|jpeg|png|webp|gif))\)/gi;
    const matches = [...markdown.matchAll(casePattern)];

    for (const match of matches) {
      const caseNumber = parseInt(match[1]);
      const imageUrl = match[2];
      imageMap.set(caseNumber, imageUrl);
    }

    console.log(`Found ${imageMap.size} image URLs from GitHub`);

    // Update prompts with correct image URLs
    let updatedCount = 0;
    for (const prompt of prompts) {
      if (prompt.sourceId === 'awesome-nano-banana' && prompt.id.startsWith('awesome-')) {
        // Extract case number from ID
        const match = prompt.id.match(/^awesome-(\d+)-/);
        if (match) {
          const caseNumber = parseInt(match[1]);
          const imageUrl = imageMap.get(caseNumber);

          if (imageUrl && imageUrl !== prompt.imageUrl) {
            prompt.imageUrl = imageUrl;
            updatedCount++;
            console.log(`Updated case ${caseNumber}: ${imageUrl}`);
          }
        }
      }
    }

    // Write back to database
    fs.writeFileSync(dbPath, JSON.stringify(prompts, null, 2), 'utf-8');

    console.log(`✅ Updated ${updatedCount} image URLs`);

  } catch (error) {
    console.error('Error fixing image URLs:', error);
  }
}

// Run the fix
fixImageUrls();
