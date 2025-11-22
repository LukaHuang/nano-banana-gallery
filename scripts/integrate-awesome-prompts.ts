/**
 * Script to integrate awesome-nano-banana prompts into our database
 */

import * as fs from 'fs';
import * as path from 'path';

interface AwesomeCase {
  id: string;
  caseNumber: number;
  title: {
    en: string;
    zh: string;
  };
  author: string;
  authorUrl?: string;
  sourceLink?: string;
  prompt: string;
  imageUrl?: string;
  category?: string;
  tags: string[];
}

interface Prompt {
  id: string;
  title: {
    en: string;
    zh: string;
  };
  description: {
    en: string;
    zh: string;
  };
  usage: {
    en: string;
    zh: string;
  };
  prompt: string;
  category: string;
  tags: string[];
  imageUrl: string;
  sourceId?: string;
}

async function integrateAwesomePrompts() {
  try {
    // Read the scraped data
    const awesomeData = JSON.parse(fs.readFileSync('/tmp/awesome-prompts-clean.json', 'utf-8'));

    // Convert awesome cases to our prompt format
    const newPrompts: Prompt[] = awesomeData.map((awesomeCase: AwesomeCase) => {
      // Generate description from title
      const descriptionEn = `${awesomeCase.title.en} - Created by ${awesomeCase.author.replace(/\[|\]|\(.*?\)/g, '')}`;
      const descriptionZh = `${awesomeCase.title.zh} - 由 ${awesomeCase.author.replace(/\[|\]|\(.*?\)/g, '')} 創建`;

      // Generate usage instructions
      const usageEn = awesomeCase.prompt.includes('[')
        ? `📝 How to use: ${extractUsageFromPrompt(awesomeCase.prompt)}`
        : `📝 How to use: This is a ${awesomeCase.prompt.toLowerCase().includes('upload') ? 'image editing' : 'text-to-image'} prompt. ${awesomeCase.title.en}.`;

      const usageZh = awesomeCase.prompt.includes('[')
        ? `📝 使用方法：${extractUsageFromPromptZh(awesomeCase.prompt)}`
        : `📝 使用方法：這是${awesomeCase.prompt.toLowerCase().includes('upload') ? '圖像編輯' : '文字轉圖像'}提示詞。${awesomeCase.title.zh}。`;

      return {
        id: awesomeCase.id,
        title: awesomeCase.title,
        description: {
          en: descriptionEn,
          zh: descriptionZh,
        },
        usage: {
          en: usageEn,
          zh: usageZh,
        },
        prompt: awesomeCase.prompt,
        category: awesomeCase.category || 'ai-design',
        tags: awesomeCase.tags.length > 0 ? awesomeCase.tags : ['AI Design'],
        imageUrl: awesomeCase.imageUrl || 'https://pub-75de598aba1c45faa2b7c57c5f262f78.r2.dev/assets3/prompts-202511221026.webp',
        sourceId: 'awesome-nano-banana',
      };
    });

    console.log(`Converted ${newPrompts.length} prompts`);

    // Save to a new file
    fs.writeFileSync(
      path.join(process.cwd(), 'data', 'awesome-prompts.json'),
      JSON.stringify(newPrompts, null, 2),
      'utf-8'
    );

    console.log('✅ Saved to data/awesome-prompts.json');
    console.log(`Total prompts: ${newPrompts.length}`);

  } catch (error) {
    console.error('Error integrating prompts:', error);
  }
}

function extractUsageFromPrompt(prompt: string): string {
  const placeholders = prompt.match(/\[([^\]]+)\]/g);
  if (placeholders && placeholders.length > 0) {
    const params = placeholders.map(p => p.replace(/[\[\]]/g, '')).join(', ');
    return `Replace the placeholders (${params}) with your specific details. ${prompt.toLowerCase().includes('upload') ? 'Upload an image to apply this prompt.' : 'Use this as a text-to-image prompt.'}`;
  }
  return 'Follow the prompt instructions to create your image.';
}

function extractUsageFromPromptZh(prompt: string): string {
  const placeholders = prompt.match(/\[([^\]]+)\]/g);
  if (placeholders && placeholders.length > 0) {
    const params = placeholders.map(p => p.replace(/[\[\]]/g, '')).join('、');
    return `將佔位符（${params}）替換為你的具體細節。${prompt.toLowerCase().includes('upload') ? '上傳圖片以應用此提示詞。' : '將此作為文字轉圖像提示詞使用。'}`;
  }
  return '按照提示詞說明創建你的圖像。';
}

// Run the integration
integrateAwesomePrompts();
