/**
 * Script to merge awesome prompts into prompts.ts
 */

import * as fs from 'fs';
import * as path from 'path';

async function mergePrompts() {
  try {
    // Read the awesome prompts
    const awesomePrompts = JSON.parse(
      fs.readFileSync(path.join(process.cwd(), 'data', 'awesome-prompts.json'), 'utf-8')
    );

    // Read the current prompts.ts file
    const promptsPath = path.join(process.cwd(), 'data', 'prompts.ts');
    let promptsContent = fs.readFileSync(promptsPath, 'utf-8');

    // Find the last prompt in the array (before the closing ];)
    const lastPromptIndex = promptsContent.lastIndexOf('  },\n];');

    if (lastPromptIndex === -1) {
      console.error('Could not find the end of prompts array');
      return;
    }

    // Generate TypeScript code for new prompts
    const newPromptsCode = awesomePrompts.map((prompt: any) => {
      return `  {
    id: '${prompt.id}',
    title: {
      en: '${escapeString(prompt.title.en)}',
      zh: '${escapeString(prompt.title.zh)}',
    },
    description: {
      en: '${escapeString(prompt.description.en)}',
      zh: '${escapeString(prompt.description.zh)}',
    },
    usage: {
      en: '${escapeString(prompt.usage.en)}',
      zh: '${escapeString(prompt.usage.zh)}',
    },
    prompt: '${escapeString(prompt.prompt)}',
    category: '${prompt.category}',
    tags: ${JSON.stringify(prompt.tags)},
    imageUrl: '${prompt.imageUrl}',
    sourceId: '${prompt.sourceId}',
  }`;
    }).join(',\n');

    // Insert new prompts before the closing ];
    const beforeClosing = promptsContent.substring(0, lastPromptIndex + 4); // Include the },
    const afterClosing = promptsContent.substring(lastPromptIndex + 4);

    const updatedContent = beforeClosing + ',\n' + newPromptsCode + '\n];' + afterClosing.substring(2);

    // Write back to file
    fs.writeFileSync(promptsPath, updatedContent, 'utf-8');

    console.log(`✅ Successfully merged ${awesomePrompts.length} prompts into prompts.ts`);

  } catch (error) {
    console.error('Error merging prompts:', error);
  }
}

function escapeString(str: string): string {
  if (!str) return '';
  return str
    .replace(/\\/g, '\\\\')
    .replace(/'/g, "\\'")
    .replace(/\n/g, '\\n')
    .replace(/\r/g, '\\r')
    .replace(/\t/g, '\\t');
}

// Run the merge
mergePrompts();
