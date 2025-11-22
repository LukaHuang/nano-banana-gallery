/**
 * Script to scrape prompts from awesome-nano-banana GitHub repository
 * and add them to our prompts database
 */

async function scrapeAwesomePrompts() {
  const readmeUrl = 'https://raw.githubusercontent.com/JimmyLv/awesome-nano-banana/main/README.md';

  try {
    const response = await fetch(readmeUrl);
    const markdown = await response.text();

    // Parse the markdown to extract cases
    const cases = parseMarkdownCases(markdown);

    console.log(`Found ${cases.length} cases`);
    console.log(JSON.stringify(cases, null, 2));

  } catch (error) {
    console.error('Error scraping prompts:', error);
  }
}

interface Case {
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

function parseMarkdownCases(markdown: string): Case[] {
  const cases: Case[] = [];

  // Split by case headers (### Case XX:)
  const casePattern = /### Case (\d+): (.+?)(?=### Case \d+:|$)/gs;
  const matches = [...markdown.matchAll(casePattern)];

  for (const match of matches) {
    const caseNumber = parseInt(match[1]);
    const fullText = match[0];

    // Extract title (first line after ###)
    const titleMatch = fullText.match(/### Case \d+: (.+?) \(by (.+?)\)/);
    if (!titleMatch) continue;

    const titleEn = titleMatch[1];
    const author = titleMatch[2];

    // Extract author URL
    const authorUrlMatch = fullText.match(/\[@.+?\]\((https:\/\/x\.com\/.+?)\)/);
    const authorUrl = authorUrlMatch ? authorUrlMatch[1] : undefined;

    // Extract source link
    const sourceLinkMatch = fullText.match(/\[Source Link\]\((https:\/\/.+?)\)/);
    const sourceLink = sourceLinkMatch ? sourceLinkMatch[1] : undefined;

    // Extract prompt (text between ```...```)
    const promptMatch = fullText.match(/```\n([\s\S]+?)\n```/);
    const prompt = promptMatch ? promptMatch[1].trim() : '';

    // Extract image URL (look for ![...](url) or direct image links)
    const imageMatch = fullText.match(/!\[.*?\]\((https:\/\/.+?\.(?:jpg|jpeg|png|webp|gif))\)/i);
    const imageUrl = imageMatch ? imageMatch[1] : undefined;

    // Generate ID from title
    const id = `awesome-${caseNumber}-${titleEn.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;

    // Translate title to Chinese (basic mapping, can be improved)
    const titleZh = translateTitle(titleEn);

    // Categorize based on title keywords
    const category = categorizePrompt(titleEn, prompt);
    const tags = extractTags(titleEn, prompt);

    cases.push({
      id,
      caseNumber,
      title: {
        en: titleEn,
        zh: titleZh,
      },
      author,
      authorUrl,
      sourceLink,
      prompt,
      imageUrl,
      category,
      tags,
    });
  }

  return cases.sort((a, b) => b.caseNumber - a.caseNumber); // Sort by case number descending
}

function translateTitle(titleEn: string): string {
  // Basic translation mapping
  const translations: Record<string, string> = {
    'Creative Ad': '創意廣告',
    'Portrait': '肖像',
    'Art': '藝術',
    'Glass': '玻璃',
    'Doll': '娃娃',
    'Figure': '公仔',
    'Selfie': '自拍',
    'Animals': '動物',
    'Retexturing': '重新貼圖',
    '3D': '3D',
    'Pop-Out': '彈出',
    'Effect': '效果',
    'Map': '地圖',
    'Keycaps': '鍵帽',
    'Pin': '徽章',
    'Coloring Page': '著色頁',
    'Letters': '字母',
    'Double Exposure': '雙重曝光',
    'Scene': '場景',
    'Wrist Rest': '腕托',
    'Diagram': '圖表',
    'Weather': '天氣',
    'Forecast': '預報',
    'Transformation': '轉換',
    'Business Card': '名片',
    'Cityscape': '城市景觀',
    'Crystal Ball': '水晶球',
    'Poster': '海報',
    'Frame': '框架',
    'Bookshelf': '書架',
    'Keychain': '鑰匙圈',
    'Necklace': '項鍊',
    'Landscape': '景觀',
    'Pokemon': '寶可夢',
    'Silhouette': '剪影',
    'Trading Card': '交易卡',
    'Game': '遊戲',
    'Universe': '宇宙',
    'Popsicle': '冰棒',
    'Fish': '魚',
    'Enamel': '琺瑯',
    'Tweet': '推文',
    'Screenshot': '截圖',
    'Rug': '地毯',
    'Vector': '向量',
    'Cloud': '雲',
    'Icon': '圖標',
    'Building': '建築',
    'Plant': '植物',
    'Planter': '花盆',
    'iPhone': 'iPhone',
    'Cushion': '靠墊',
    'Paper Craft': '紙藝',
    'Stamp': '郵票',
    'Card': '卡片',
    'Magazine': '雜誌',
    'Cover': '封面',
    'Voxel': '體素',
    'Diorama': '場景模型',
    'Capsule': '膠囊',
    'Chibi': 'Q版',
    'Matryoshka': '套娃',
    'Snow Globe': '雪花球',
    'Manga': '漫畫',
    'Illustration': '插圖',
    'Infographic': '資訊圖',
    'Minimalist': '極簡',
    'Lego': '樂高',
    'Room': '房間',
    'Design': '設計',
    'Portal': '傳送門',
    'Ghibli': '吉卜力',
    'Wedding': '婚禮',
    'Promotional': '宣傳',
    'Polaroid': '拍立得',
    'Proposal': '求婚',
  };

  let translated = titleEn;
  for (const [en, zh] of Object.entries(translations)) {
    translated = translated.replace(new RegExp(en, 'gi'), zh);
  }

  return translated;
}

function categorizePrompt(title: string, prompt: string): string {
  const text = (title + ' ' + prompt).toLowerCase();

  if (text.includes('portrait') || text.includes('face') || text.includes('selfie')) {
    return 'portrait';
  }
  if (text.includes('3d') || text.includes('render') || text.includes('model')) {
    return 'product-design';
  }
  if (text.includes('character') || text.includes('anime') || text.includes('chibi')) {
    return 'character-design';
  }
  if (text.includes('poster') || text.includes('ad') || text.includes('design')) {
    return 'ai-design';
  }
  if (text.includes('style') || text.includes('transform') || text.includes('convert')) {
    return 'style-transfer';
  }
  if (text.includes('technical') || text.includes('diagram') || text.includes('infographic')) {
    return 'technical-illustration';
  }
  if (text.includes('scene') || text.includes('background') || text.includes('environment')) {
    return 'scene-compositing';
  }
  if (text.includes('product') || text.includes('object')) {
    return 'product-design';
  }

  return 'conceptual-art';
}

function extractTags(title: string, prompt: string): string[] {
  const tags: string[] = [];
  const text = (title + ' ' + prompt).toLowerCase();

  if (text.includes('3d')) tags.push('3D Style');
  if (text.includes('portrait')) tags.push('AI Portrait');
  if (text.includes('character')) tags.push('Character');
  if (text.includes('anime')) tags.push('Anime');
  if (text.includes('design')) tags.push('AI Design');
  if (text.includes('product')) tags.push('Product Photography');
  if (text.includes('chibi') || text.includes('cute')) tags.push('Cute');
  if (text.includes('retro') || text.includes('vintage')) tags.push('Retro');
  if (text.includes('pixel')) tags.push('Pixel Art');
  if (text.includes('glass')) tags.push('Glassmorphism');
  if (text.includes('surreal')) tags.push('Surreal');
  if (text.includes('fantasy')) tags.push('Fantasy');
  if (text.includes('technical')) tags.push('Technical');
  if (text.includes('infographic')) tags.push('Infographic');

  return tags.length > 0 ? tags : ['AI Design'];
}

// Run the scraper
scrapeAwesomePrompts();
