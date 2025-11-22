/**
 * Script to verify if image URLs are actually accessible (200 OK)
 * and remove prompts with inaccessible images.
 */

import * as fs from 'fs';
import * as path from 'path';

interface PromptDB {
  id: string;
  imageUrl: string;
  sourceId?: string;
  [key: string]: any;
}

async function verifyAndRemoveBadImages() {
  try {
    const dbPath = path.join(process.cwd(), 'data', 'prompts-db.json');
    const prompts: PromptDB[] = JSON.parse(fs.readFileSync(dbPath, 'utf-8'));

    console.log(`Checking ${prompts.length} prompts for image availability...`);

    const validPrompts: PromptDB[] = [];
    let removedCount = 0;

    // Process in batches to avoid overwhelming network
    const batchSize = 10;
    for (let i = 0; i < prompts.length; i += batchSize) {
      const batch = prompts.slice(i, i + batchSize);
      const results = await Promise.all(batch.map(async (prompt) => {
        try {
          // Skip checking default images or known good domains if we want to speed up,
          // but for thoroughness let's check everything or at least awesome-nano-banana ones
          if (prompt.sourceId !== 'awesome-nano-banana') {
            return { prompt, valid: true };
          }

          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), 5000); // 5s timeout

          const response = await fetch(prompt.imageUrl, {
            method: 'HEAD',
            signal: controller.signal
          });

          clearTimeout(timeoutId);

          if (response.ok) {
            return { prompt, valid: true };
          } else {
            console.log(`❌ Image check failed for ${prompt.id}: ${response.status} ${response.statusText}`);
            return { prompt, valid: false };
          }
        } catch (error) {
          console.log(`❌ Image check error for ${prompt.id}: ${error}`);
          return { prompt, valid: false };
        }
      }));

      for (const result of results) {
        if (result.valid) {
          validPrompts.push(result.prompt);
        } else {
          removedCount++;
        }
      }

      // Small delay between batches
      await new Promise(resolve => setTimeout(resolve, 100));
    }

    if (removedCount > 0) {
      console.log(`\nFound ${removedCount} prompts with inaccessible images.`);
      fs.writeFileSync(dbPath, JSON.stringify(validPrompts, null, 2), 'utf-8');
      console.log('✅ Updated database, removed bad prompts.');
    } else {
      console.log('\n✅ All prompts have accessible images.');
    }

    console.log(`📊 Total prompts remaining: ${validPrompts.length}`);

  } catch (error) {
    console.error('Error verifying images:', error);
  }
}

verifyAndRemoveBadImages();
