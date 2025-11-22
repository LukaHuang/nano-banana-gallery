export interface Prompt {
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
}

export const categories = [
  { id: 'image-editing', en: 'Image Editing', zh: '圖像編輯' },
  { id: 'portrait', en: 'Portrait', zh: '肖像' },
  { id: 'ai-design', en: 'AI Design', zh: 'AI 設計' },
  { id: 'photo-enhancement', en: 'Photo Enhancement', zh: '照片增強' },
  { id: 'scene-compositing', en: 'Scene Compositing', zh: '場景合成' },
  { id: 'character-design', en: 'Character Design', zh: '角色設計' },
  { id: 'style-transfer', en: 'Style Transfer', zh: '風格轉換' },
  { id: 'background-removal', en: 'Background Removal', zh: '背景移除' },
  { id: 'conceptual-art', en: 'Conceptual Art', zh: '概念藝術' },
];

export const prompts: Prompt[] = [
  {
    id: 'sketch-to-photo',
    title: {
      en: 'Sketch to Photorealistic Anime',
      zh: '素描轉逼真動漫',
    },
    description: {
      en: 'Convert sketches into photorealistic anime scenes',
      zh: '將素描轉換為逼真的動漫場景',
    },
    usage: {
      en: '📝 How to use: Upload a sketch or line drawing. This prompt will transform it into a photorealistic anime-style scene while maintaining the original composition and perspective.',
      zh: '📝 使用方法：上傳素描或線稿圖。此提示詞會將其轉換為逼真的動漫風格場景，同時保持原始構圖和透視。',
    },
    prompt: 'Convert this sketch into a photorealistic scene in the style of anime, keeping the composition, perspective, and key storytelling elements intact while enhancing textures, materials, and lighting.',
    category: 'image-editing',
    tags: ['Aesthetic Edit', 'Style Transfer', 'Anime', 'Photorealistic'],
    imageUrl: 'https://pub-75de598aba1c45faa2b7c57c5f262f78.r2.dev/assets2/editimg-sketch-to-photo-1.webp',
  },
  {
    id: 'instant-camera',
    title: {
      en: 'Instant Camera Portrait',
      zh: '即時相機肖像',
    },
    description: {
      en: 'Generate instant camera style portraits with customizable hairstyles',
      zh: '生成可自訂髮型的即時相機風格肖像',
    },
    usage: {
      en: '📝 How to use: Upload a portrait photo. Customize the hairstyle or accessories in the prompt (bangs, bun, waves, earrings). The result will have a vintage Polaroid aesthetic with bright flash and high contrast.',
      zh: '📝 使用方法：上傳肖像照片。在提示詞中自訂髮型或配飾（瀏海、包頭、波浪、耳環）。結果會呈現復古拍立得美學，具有明亮閃光和高對比度。',
    },
    prompt: 'Pick a hairstyle or accessory for me—like chic bangs, a sleek bun, soft waves, or bold statement earrings. I\'ll generate an instant camera portrait in full color, centred in the shot against a white backdrop, facing the camera. The final image will have bright, direct flash, high contrast, and dramatic shadows to nail the instant photo vibe. The printed photo will sit on a matte white surface for that authentic analog feel.',
    category: 'portrait',
    tags: ['AI Polaroid', 'Portrait', 'Photography Style'],
    imageUrl: 'https://pub-75de598aba1c45faa2b7c57c5f262f78.r2.dev/assets3/from-mirror-pic-instant-camera-moment-this-ai-glow-up-is-v0-dv982cqnkqzf1.webp',
  },
  {
    id: 'glassmorphism-music',
    title: {
      en: 'Glassmorphism Music Player Scene',
      zh: '玻璃擬態音樂播放器場景',
    },
    description: {
      en: 'Place subject in atmospheric background with music UI overlay',
      zh: '將主體置於帶有音樂 UI 疊加層的氛圍背景中',
    },
    usage: {
      en: '📝 How to use: Upload a portrait. Customize the background setting, pose, song title, and artist name. Creates a cinematic portrait with a floating glassmorphism music player widget overlay.',
      zh: '📝 使用方法：上傳肖像。自訂背景設置、姿勢、歌曲標題和藝術家名稱。創建帶有浮動玻璃擬態音樂播放器小部件疊加層的電影肖像。',
    },
    prompt: 'Place the subject into a new atmospheric background with a floating glassmorphism music player interface. Use cinematic portrait styling with shallow depth of field and soft ambient lighting. The music player should have a frosted glass effect with customizable song title and artist name.',
    category: 'scene-compositing',
    tags: ['Aesthetic Edit', 'Cinematic', 'Glassmorphism', 'UI Design'],
    imageUrl: 'https://pub-75de598aba1c45faa2b7c57c5f262f78.r2.dev/assets3/how-to-create-glassmorphism-music-player-effect-with-nano-v0-8jaiocua1uzf1.webp',
  },
  {
    id: 'grid-variations',
    title: {
      en: '2x2 Grid Variations',
      zh: '2x2 網格變化',
    },
    description: {
      en: 'Create four style variations in a 2x2 grid',
      zh: '在 2x2 網格中創建四種風格變化',
    },
    usage: {
      en: '📝 How to use: Upload an image. Replace [describe your scene or product] with your subject and [specify what should be changing] with the variations you want (color, material, layout, etc.). Great for exploring different design options.',
      zh: '📝 使用方法：上傳圖片。將 [描述你的場景或產品] 替換為你的主題，將 [指定應該改變的內容] 替換為你想要的變化（顏色、材質、佈局等）。非常適合探索不同的設計選項。',
    },
    prompt: 'Create four variations of this [describe your scene or product], with different [specify what should be changing in the image, colour, material, layout, etc], and display them in a 2x2 grid.',
    category: 'ai-design',
    tags: ['AI Design', 'Product Visualization', 'Variations'],
    imageUrl: 'https://pub-75de598aba1c45faa2b7c57c5f262f78.r2.dev/assets2/steal-this-prompt-to-efficiently-explore-styles-with-nano-v0-yq9b2ff5a9zf1.webp',
  },
  {
    id: 'glass-neuron-cathedral',
    title: {
      en: 'Glass Neuron Cathedral',
      zh: '玻璃神經元大教堂',
    },
    description: {
      en: 'Surreal cathedral made of translucent glass neurons',
      zh: '由半透明玻璃神經元製成的超現實大教堂',
    },
    usage: {
      en: '📝 How to use: This is a text-to-image prompt. No image upload needed. Use as-is or modify the description to create your own surreal architectural visualization combining biological and technological elements.',
      zh: '📝 使用方法：這是一個文字轉圖像提示詞。無需上傳圖片。可以直接使用或修改描述，創建結合生物和科技元素的超現實建築視覺化。',
    },
    prompt: 'An immense cathedral sculpted entirely from translucent glass neurons, each dendrite and synapse alive with pulsating streams of electric light. Golden neural currents flow through the walls like living veins, illuminating the interior with an ethereal, bioluminescent glow. Thousands of floating books drift weightlessly through the air — their pages turning slowly, letters lifting off to form glowing sentences that swirl before dissolving into dusts of light. The architecture breathes subtly, as if conscious — every arch and column humming with faint human whispers, echoes of memories and dreams. Through the neuron-stained glass windows, beams of diffused light refract into soft halos that ripple across the polished floor like thoughts in motion. The atmosphere is reverent and otherworldly — half sacred sanctuary, half living mind — a divine fusion of organic memory and technology, suspended between science and spirit.',
    category: 'conceptual-art',
    tags: ['3D Style', 'Surreal', 'Fantasy', 'Architecture'],
    imageUrl: 'https://pub-75de598aba1c45faa2b7c57c5f262f78.r2.dev/assets2/nanobananaprompt_2025-11-03.webp',
  },
  {
    id: 'photo-colorization',
    title: {
      en: 'Photo Colorization',
      zh: '照片上色',
    },
    description: {
      en: 'Add realistic colors to black and white photos',
      zh: '為黑白照片添加逼真的色彩',
    },
    usage: {
      en: '📝 How to use: Upload a black and white or grayscale photo. The AI will automatically add realistic, natural colors while preserving all original details and textures. Perfect for restoring old family photos.',
      zh: '📝 使用方法：上傳黑白或灰階照片。AI 會自動添加逼真、自然的色彩，同時保留所有原始細節和紋理。非常適合修復舊家庭照片。',
    },
    prompt: 'Colorize this black and white photo with realistic, natural colors. Apply accurate skin tones, appropriate environmental colors (blue sky, green vegetation), and contextually appropriate colors for clothing and objects. Maintain all original details, textures, and photographic quality while adding vibrant, lifelike colors that make the image feel authentic and historically plausible.',
    category: 'photo-enhancement',
    tags: ['Image Restoration', 'Photo Enhancement', 'Colorization'],
    imageUrl: 'https://pub-75de598aba1c45faa2b7c57c5f262f78.r2.dev/assets2/weinfowadksvm.webp',
  },
  {
    id: 'white-background',
    title: {
      en: 'White Background Removal',
      zh: '白色背景移除',
    },
    description: {
      en: 'Replace background with pure white',
      zh: '將背景替換為純白色',
    },
    usage: {
      en: '📝 How to use: Upload any photo with a subject. The background will be cleanly removed and replaced with pure white (RGB 255, 255, 255). Ideal for product photography, profile pictures, and professional listings.',
      zh: '📝 使用方法：上傳任何帶有主體的照片。背景會被乾淨地移除並替換為純白色（RGB 255, 255, 255）。非常適合產品攝影、個人資料圖片和專業列表。',
    },
    prompt: 'Replace the background with a clean, pure white background (RGB 255, 255, 255), keeping the subject sharp and clear with natural edges.',
    category: 'background-removal',
    tags: ['Image Editing', 'Background Removal', 'Product Photography'],
    imageUrl: 'https://pub-75de598aba1c45faa2b7c57c5f262f78.r2.dev/assets2/Group%2077.webp',
  },
  {
    id: 'pixel-art-split',
    title: {
      en: 'Pixel Art Split Portrait',
      zh: '像素藝術分割肖像',
    },
    description: {
      en: 'Split portrait: 8-bit pixel art vs. photorealistic',
      zh: '分割肖像：8位像素藝術 vs. 逼真照片',
    },
    usage: {
      en: '📝 How to use: Upload a portrait photo. Replace [CHARACTER] with a description of the subject. Creates a dramatic split-screen effect with retro 8-bit pixel art on the left and hyper-realistic cinematic style on the right.',
      zh: '📝 使用方法：上傳肖像照片。將 [CHARACTER] 替換為主體的描述。創建戲劇性的分屏效果，左側為復古 8 位像素藝術，右側為超逼真電影風格。',
    },
    prompt: 'A split portrait of [CHARACTER], left side in retro pixel art (8-bit game style), right side hyper-realistic cinematic portrait. The two halves are separated by a thin white vertical line in the center. The transition is dissolving pixels transforming into realistic skin, ultra-detailed textures on the realistic side, strong studio lighting highlighting both sides, dark neutral background for contrast, clean and sharp focus. 1080x1080 dimension',
    category: 'character-design',
    tags: ['AI Portrait', '3D Style', 'Retro', 'Photorealistic'],
    imageUrl: 'https://pub-75de598aba1c45faa2b7c57c5f262f78.r2.dev/assets2/nano-banana-the-pixel-1.jpg',
  },
  {
    id: 'portrait-with-props',
    title: {
      en: 'Portrait with Oversized Props',
      zh: '帶超大道具的肖像',
    },
    description: {
      en: 'Full-body portrait with props and studio setting',
      zh: '帶道具和工作室設置的全身肖像',
    },
    usage: {
      en: '📝 How to use: Upload a portrait. Customize the pose (sitting/standing), the oversized prop object (camera/phone/book), what they hold in hand (cup/phone), and background color (lavender/blue/pink). Creates professional studio-style portraits.',
      zh: '📝 使用方法：上傳肖像。自訂姿勢（坐/站）、超大道具物品（相機/手機/書籍）、手持物品（杯子/手機）和背景顏色（薰衣草紫/藍色/粉色）。創建專業工作室風格的肖像。',
    },
    prompt: 'A hyper-realistic full-body portrait of uploaded image. Their pose is \'sitting\'. Beside them stands a vertical oversized \'camera\', placed firmly on the ground, slightly tilted for a stylish aesthetic. The object is approximately at arm-height, allowing them to casually lean one arm on it for support. In their other hand, they hold a \'cup\'. Minimal \'lavender\' studio background with soft cinematic lighting. Ultra-detailed textures on clothing, skin, hair, object surfaces. Composition clean, minimal, modern, and visually striking.',
    category: 'portrait',
    tags: ['AI Portrait', 'Product Photography', 'Studio'],
    imageUrl: 'https://pub-75de598aba1c45faa2b7c57c5f262f78.r2.dev/assets2/nano-banana-the-ai-model-giving-creators-power-over-image-v0-vmt236xjh6yf1.webp',
  },
];
