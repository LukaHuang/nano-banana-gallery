/**
 * Script to fix missing sourceId in prompts.ts
 */

import * as fs from 'fs';
import * as path from 'path';

async function fixMissingSourceIds() {
  try {
    const promptsPath = path.join(process.cwd(), 'data', 'prompts.ts');
    let content = fs.readFileSync(promptsPath, 'utf-8');

    // Find prompts that don't have sourceId
    // We look for the pattern where a prompt object ends but doesn't have sourceId before the closing brace
    // This is a bit tricky with regex, so we'll use a simpler approach:
    // Iterate through the prompts array in the file content and inject sourceId if missing

    const lines = content.split('\n');
    let inPromptsArray = false;
    let currentPromptStart = -1;
    let hasSourceId = false;
    let newLines: string[] = [];

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      if (line.includes('export const prompts: Prompt[] = [')) {
        inPromptsArray = true;
        newLines.push(line);
        continue;
      }

      if (inPromptsArray) {
        if (line.trim() === '{') {
          currentPromptStart = i;
          hasSourceId = false;
          newLines.push(line);
        } else if (line.trim() === '},' || line.trim() === '}') {
          if (currentPromptStart !== -1 && !hasSourceId) {
            // Add sourceId before closing brace
            newLines.push("    sourceId: 'nanobana',");
            console.log('Fixed missing sourceId for a prompt');
          }
          newLines.push(line);
          currentPromptStart = -1;
        } else {
          if (line.includes('sourceId:')) {
            hasSourceId = true;
          }
          newLines.push(line);
        }
      } else {
        newLines.push(line);
      }
    }

    const newContent = newLines.join('\n');

    if (content !== newContent) {
      fs.writeFileSync(promptsPath, newContent, 'utf-8');
      console.log('✅ Successfully updated prompts.ts with missing sourceIds');
    } else {
      console.log('No changes needed in prompts.ts');
    }

  } catch (error) {
    console.error('Error fixing prompts:', error);
  }
}

// Run the fix
fixMissingSourceIds();
