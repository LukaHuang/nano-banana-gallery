/**
 * Script to fetch real image URLs from GitHub repository
 * and update prompts database
 */

import * as fs from 'fs';
import * as path from 'path';

interface PromptDB {
  id: string;
  imageUrl: string;
  sourceId?: string;
  [key: string]: any;
}

async function fetchImageUrls() {
  try {
    // Read the current database
    const dbPath = path.join(process.cwd(), 'data', 'prompts-db.json');
    const prompts: PromptDB[] = JSON.parse(fs.readFileSync(dbPath, 'utf-8'));

    console.log('Fetching image URLs from GitHub...');

    // Fetch image URLs for each case
    let updatedCount = 0;
    let failedCount = 0;

    for (const prompt of prompts) {
      if (prompt.sourceId === 'awesome-nano-banana' && prompt.id.startsWith('awesome-')) {
        // Extract case number from ID
        const match = prompt.id.match(/^awesome-(\d+)-/);
        if (match) {
          const caseNumber = match[1];

          try {
            // Fetch the contents of the case directory
            const apiUrl = `https://api.github.com/repos/JimmyLv/awesome-nano-banana/contents/cases/${caseNumber}`;
            const response = await fetch(apiUrl);

            if (!response.ok) {
              console.log(`⚠️  Case ${caseNumber}: Directory not found`);
              failedCount++;
              continue;
            }

            const files = await response.json();

            // Find the first image file
            const imageFile = files.find((file: any) =>
              file.name.endsWith('.webp') ||
              file.name.endsWith('.png') ||
              file.name.endsWith('.jpg') ||
              file.name.endsWith('.jpeg')
            );

            if (imageFile && imageFile.download_url) {
              prompt.imageUrl = imageFile.download_url;
              updatedCount++;
              console.log(`✅ Case ${caseNumber}: ${imageFile.name}`);
            } else {
              console.log(`⚠️  Case ${caseNumber}: No image found`);
              failedCount++;
            }

            // Add a small delay to avoid rate limiting
            await new Promise(resolve => setTimeout(resolve, 100));

          } catch (error) {
            console.error(`❌ Case ${caseNumber}: Error -`, error);
            failedCount++;
          }
        }
      }
    }

    // Write back to database
    fs.writeFileSync(dbPath, JSON.stringify(prompts, null, 2), 'utf-8');

    console.log(`\n✅ Updated ${updatedCount} image URLs`);
    console.log(`⚠️  Failed to fetch ${failedCount} images`);

  } catch (error) {
    console.error('Error fetching image URLs:', error);
  }
}

// Run the fetch
fetchImageUrls();
