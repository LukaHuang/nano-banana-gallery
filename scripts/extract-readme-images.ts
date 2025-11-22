/**
 * Script to extract image URLs from README markdown tables
 */

import * as fs from 'fs';
import * as path from 'path';

interface PromptDB {
  id: string;
  imageUrl: string;
  sourceId?: string;
  [key: string]: any;
}

async function extractImagesFromReadme() {
  try {
    // Fetch the README
    const readmeUrl = 'https://raw.githubusercontent.com/JimmyLv/awesome-nano-banana/main/README.md';
    const response = await fetch(readmeUrl);
    const markdown = await response.text();

    // Extract images from markdown tables
    const imageMap = new Map<number, string>();

    // Pattern to match case sections with image tables
    // Looking for: ### Case X: ... followed by table with <img src="...">
    const lines = markdown.split('\n');
    let currentCase: number | null = null;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      // Check for case header
      const caseMatch = line.match(/^### Case (\d+):/);
      if (caseMatch) {
        currentCase = parseInt(caseMatch[1]);
        continue;
      }

      // Check for image in table (Gemini column - first image)
      if (currentCase !== null && line.includes('<img src=')) {
        const imgMatch = line.match(/<img src="(https:\/\/[^"]+)"/);
        if (imgMatch) {
          const imageUrl = imgMatch[1];
          // Prefer Gemini images (bibigpt-apps.chatvid.ai)
          if (!imageMap.has(currentCase) || imageUrl.includes('bibigpt-apps.chatvid.ai')) {
            imageMap.set(currentCase, imageUrl);
            console.log(`✅ Case ${currentCase}: Found image`);
          }
        }
      }
    }

    console.log(`\nFound ${imageMap.size} images from README`);

    // Read the current database
    const dbPath = path.join(process.cwd(), 'data', 'prompts-db.json');
    const prompts: PromptDB[] = JSON.parse(fs.readFileSync(dbPath, 'utf-8'));

    // Update prompts with image URLs
    let updatedCount = 0;
    for (const prompt of prompts) {
      if (prompt.sourceId === 'awesome-nano-banana' && prompt.id.startsWith('awesome-')) {
        const match = prompt.id.match(/^awesome-(\d+)-/);
        if (match) {
          const caseNumber = parseInt(match[1]);
          const imageUrl = imageMap.get(caseNumber);

          if (imageUrl) {
            prompt.imageUrl = imageUrl;
            updatedCount++;
          }
        }
      }
    }

    // Write back to database
    fs.writeFileSync(dbPath, JSON.stringify(prompts, null, 2), 'utf-8');

    console.log(`✅ Updated ${updatedCount} image URLs in database`);

  } catch (error) {
    console.error('Error extracting images:', error);
  }
}

// Run the extraction
extractImagesFromReadme();
