export interface Source {
  id: string;
  name: string;
  url: string;
  description?: {
    en: string;
    zh: string;
  };
}

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
  sourceId?: string;
}

export const sources: Source[] = [
  {
    id: 'nanobana',
    name: 'nanobananaprompt.org',
    url: 'https://nanobananaprompt.org',
    description: {
      en: 'AI Prompt Gallery & Community - A comprehensive library of high-quality prompts for various AI image generation tools.',
      zh: 'AI 提示詞圖庫與社群 - 全面的高品質 AI 圖像生成工具提示詞圖庫。',
    },
  },
];

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
  { id: 'product-design', en: 'Product Design', zh: '產品設計' },
  { id: 'technical-illustration', en: 'Technical Illustration', zh: '技術插圖' },
  { id: 'costume-character', en: 'Costume & Character', zh: '服裝角色' },
];

export const prompts: Prompt[] = [
  {
    id: 'modern-poster-design',
    title: {
      en: 'Modern Poster Design from Photo',
      zh: '照片轉現代海報設計',
    },
    description: {
      en: 'Transform photos into modern flat design posters with Y2K/acid aesthetics',
      zh: '將照片轉換為具有 Y2K/酸性美學的現代平面設計海報',
    },
    usage: {
      en: '📝 How to use: Upload any photo. The AI will extract the subject, create a frosted glass background, add color blocks and typography to create a modern Y2K-style poster design.',
      zh: '📝 使用方法：上傳任何照片。AI 會提取主體，創建磨砂玻璃背景，添加色塊和排版，創建現代 Y2K 風格海報設計。',
    },
    prompt: 'Analyze the uploaded photo and convert it into a modern flat design poster. Subject processing: Precisely extract the subject from the original background as the core element. Background transformation: Replace the original background with an abstract frosted glass textured background that retains the color tone (like green and brown) but completely blurs the details. Core composition: Add a prominent solid color rectangle block behind the subject, extracting the color from the brightest color in the photo. Add a main title text related to the photo subject content, using a bold, design-conscious sans-serif font. Crucially, place this title layer behind the subject to create a spatial sense where the subject occludes the text. Detail additions: Add small, informational text at different positions in the image to create visual hierarchy. Add simulated transparent tape material at the bottom of stems to make elements look like they are pasted on the poster, adding realism and collage feel. Style unification: Ensure the entire poster has Y2K aesthetics or acid design style with rich texture and layering. Let the title and color blocks have some transparency fusion with the glass-textured background to make the whole more coordinated.',
    category: 'ai-design',
    tags: ['Image Editing', 'Design', 'Y2K Aesthetic', 'Poster'],
    imageUrl: 'https://pub-75de598aba1c45faa2b7c57c5f262f78.r2.dev/assets3/prompts-202511221026.webp',
    sourceId: 'nanobana',
  },
  {
    id: 'photo-enhancement-upscaling',
    title: {
      en: 'Photo Enhancement & Upscaling',
      zh: '照片增強與放大',
    },
    description: {
      en: 'Professional portrait enhancement with detailed skin rendering',
      zh: '專業肖像增強，具有詳細的皮膚渲染',
    },
    usage: {
      en: '📝 How to use: Upload a portrait photo. The AI will enhance and upscale it while preserving composition, adding realistic skin details like pores, fine lines, and natural texture for a high-end beauty photograph look.',
      zh: '📝 使用方法：上傳肖像照片。AI 會在保留構圖的同時進行增強和放大，添加逼真的皮膚細節，如毛孔、細紋和自然紋理，呈現高端美容照片效果。',
    },
    prompt: 'Enhance and upscale the image while keeping composition and colors identical. Eliminate blur and give the skin a lifelike, detailed look: clear pores, faint fine lines, light freckles, and realistic transitions between shadow and highlight. Maintain the tone of the light and the background, refine edge sharpness around eyes, lashes, lips and hair strands so the portrait appears like a high-end beauty photograph with natural, unplastic skin.',
    category: 'photo-enhancement',
    tags: ['Enhance Image', 'AI Photo Enhancer', 'Portrait', 'Upscaling'],
    imageUrl: 'https://pub-75de598aba1c45faa2b7c57c5f262f78.r2.dev/assets3/prompts-202511220957.webp',
  },
  {
    id: 'street-mural-anime',
    title: {
      en: 'Street Mural with Girl & Rose Flowers',
      zh: '街頭壁畫：女孩與玫瑰花',
    },
    description: {
      en: 'Anime-style portrait integrated with realistic street mural setting',
      zh: '動漫風格肖像與真實街頭壁畫場景融合',
    },
    usage: {
      en: '📝 How to use: This is a text-to-image prompt. Creates a photorealistic street mural featuring an anime-style woman with roses as her hair crown. Perfect for creating dreamy, romantic street art scenes.',
      zh: '📝 使用方法：這是文字轉圖像提示詞。創建一幅逼真的街頭壁畫，描繪動漫風格女性，玫瑰花作為她的髮冠。非常適合創建夢幻浪漫的街頭藝術場景。',
    },
    prompt: 'An ultra-high-definition, photographic-quality street mural with strong Chinese aesthetic flavor. The painting depicts a close-up portrait of an extremely beautiful cartoon-style woman, her expression soft and serene. The top of the wall is covered with abundant blooming rose flowers, lush green leaves and flourishing flowers extending outward, some branches hanging down from the top and skillfully blending with the woman\'s hair, making her hair appear as if composed of layers of roses. These dense flowers cluster around the woman\'s head, forming a magnificent flower crown with gorgeous romantic visual effects. The background features clear blue sky dotted with white clouds; the ground is a detailed asphalt street scattered with colorful petals, with pedestrians leisurely strolling. The overall scene is meticulously detailed, with bright soft lighting, creating a dreamlike street scene atmosphere as if real.',
    category: 'character-design',
    tags: ['AI Portrait', 'Character', 'Street Art', 'Anime'],
    imageUrl: 'https://pub-75de598aba1c45faa2b7c57c5f262f78.r2.dev/assets3/G6TbXGAWIAAFzPx.webp',
  },
  {
    id: 'cloud-relaxation-scene',
    title: {
      en: 'Cloud Relaxation Scene',
      zh: '雲端放鬆場景',
    },
    description: {
      en: 'Surreal scene composition with character placed in dreamy environment',
      zh: '超現實場景構圖，將角色置於夢幻環境中',
    },
    usage: {
      en: '📝 How to use: Upload a portrait photo. The person will be placed on fluffy clouds high in the sky with golden hour lighting. Perfect for creating surreal, peaceful fantasy scenes while maintaining facial accuracy.',
      zh: '📝 使用方法：上傳肖像照片。人物會被放置在天空中的蓬鬆雲朵上，配以黃金時段光線。非常適合創建超現實、平和的幻想場景，同時保持面部準確性。',
    },
    prompt: 'the person from the reference photo ( keep the face of the person 100% accurate from the reference image ) relaxing on a fluffy, glowing cloud high above the sky, surrounded by soft golden sunlight and vast layers of clouds stretching to the horizon. the person is lying back comfortably with a pillow, wearing a dark long-sleeve shirt, olive green pants, and glasses, holding a book in one hand and a coffee cup in the other. the lighting is cinematic and warm, capturing the golden hour ambiance with radiant highlights and gentle shadows across the clouds. captured with a wide-angle lens at medium depth of field, balancing focus between the subject and the surrounding dreamy sky. the overall atmosphere is surreal and serene, blending realism with fantasy in a peaceful, imaginative setting.',
    category: 'scene-compositing',
    tags: ['AI Design', 'Character Image Generation', 'Fantasy', 'Surreal'],
    imageUrl: 'https://pub-75de598aba1c45faa2b7c57c5f262f78.r2.dev/assets3/prompts-202511220951.webp',
  },
  {
    id: 'product-render-design',
    title: {
      en: 'Product Render Design',
      zh: '產品渲染設計',
    },
    description: {
      en: 'Technical product visualization from sketch specifications',
      zh: '從草圖規格進行技術產品視覺化',
    },
    usage: {
      en: '📝 How to use: Upload a product sketch or drawing. Specify materials (aluminum, stainless steel) and accent colors (RAL orange). Creates professional 3D product renders for presentations.',
      zh: '📝 使用方法：上傳產品草圖或繪圖。指定材料（鋁、不銹鋼）和強調色（RAL 橙色）。為演示創建專業 3D 產品渲染。',
    },
    prompt: 'Create a Product render based on this drawing, Aluminium, stainless, and a bright accent color, RAL orange.',
    category: 'product-design',
    tags: ['AI Product Photography', 'Design', '3D Rendering', 'Industrial'],
    imageUrl: 'https://pub-75de598aba1c45faa2b7c57c5f262f78.r2.dev/assets3/Group 1171274963.webp',
  },
  {
    id: 'aircraft-cross-section',
    title: {
      en: 'Aircraft Cross-Section Technical Infographic',
      zh: '飛機橫斷面技術資訊圖',
    },
    description: {
      en: 'Technical cutaway illustration with engineering annotations',
      zh: '帶有工程註釋的技術剖面插圖',
    },
    usage: {
      en: '📝 How to use: Text-to-image prompt. Creates a highly detailed 3D cross-section infographic of a commercial aircraft, showing internal systems with exploded parts and professional English labels. Perfect for educational and technical presentations.',
      zh: '📝 使用方法：文字轉圖像提示詞。創建商用飛機的高度詳細 3D 橫截面資訊圖，顯示內部系統的分解零件和專業英文標籤。非常適合教育和技術演示。',
    },
    prompt: 'Create a highly technological 3D cross-section infographic designed to showcase the internal structure and operating principles of a modern commercial jet aircraft. The image is presented with high fidelity and refinement, using a semi-disassembled cross-section treatment for the aircraft body (including fuselage, wings, tail, and the turbofan engine as a key focus) to reveal its complex internal structure. Key components (such as: cockpit avionics systems, cabin framework, cargo hold, fuel tanks, wing ribs/spars, engine compressor/turbine, landing gear mechanisms, etc.) are orderly disassembled and arranged in a suspended state, connected to the main body with guide lines. Each major part is accompanied by clear, professional English labels, clearly indicating the structure name and its concise functional description. The overall layout pursues ultimate neatness and logic, with a clean background, styled like a future interactive high-level engineering blueprint.',
    category: 'technical-illustration',
    tags: ['AI Design', '3D Style', 'Technical', 'Infographic'],
    imageUrl: 'https://pub-75de598aba1c45faa2b7c57c5f262f78.r2.dev/assets3/G6NhVanacAUJgrY.jpeg',
  },
  {
    id: 'comic-strip-story',
    title: {
      en: 'Comic Strip Story (Zebra & Elephant)',
      zh: '連環畫故事（斑馬與大象）',
    },
    description: {
      en: 'Multi-panel narrative illustration for young children',
      zh: '為幼兒設計的多格敘事插圖',
    },
    usage: {
      en: '📝 How to use: Specify story details and characters. Creates an 8-page comic strip with bilingual dialogue (Chinese/English), perfect for storytelling to toddlers. Maintains character consistency across all panels.',
      zh: '📝 使用方法：指定故事細節和角色。創建 8 頁雙語對話（中文/英文）連環畫，非常適合為幼兒講故事。在所有格子中保持角色一致性。',
    },
    prompt: 'Help me generate an 8-page comic strip for storytelling to a 2.5-year-old child, with short bilingual dialogue in Chinese and English. The protagonists are a zebra and an elephant. Need to show the protagonists from multiple angles while maintaining character consistency.',
    category: 'character-design',
    tags: ['AI draw', 'Character', 'Comic', 'Children'],
    imageUrl: 'https://pub-75de598aba1c45faa2b7c57c5f262f78.r2.dev/assets3/prompts-202511220939.webp',
  },
  {
    id: 'camera-aperture-comparison',
    title: {
      en: 'Camera Aperture Comparison Photography',
      zh: '相機光圈對比攝影',
    },
    description: {
      en: 'Comparative photography demonstrating aperture settings',
      zh: '展示光圈設置的對比攝影',
    },
    usage: {
      en: '📝 How to use: Specify camera settings and subject. Creates multiple images showing depth-of-field variations at different apertures (f/1.8, f/2.8, f/10, f/14). Great for photography education and comparison.',
      zh: '📝 使用方法：指定相機設置和主體。創建多張圖像，展示不同光圈（f/1.8、f/2.8、f/10、f/14）的景深變化。非常適合攝影教育和對比。',
    },
    prompt: 'Canon camera, 85mm prime lens, generate gradually changing aperture effects at f/1.8, f/2.8, f/10, f/14, with a gentle beautiful woman as the model, background is the city blue hour after dusk.',
    category: 'portrait',
    tags: ['AI Photo Enhancer', 'Portrait', 'Photography', 'Technical'],
    imageUrl: 'https://pub-75de598aba1c45faa2b7c57c5f262f78.r2.dev/assets3/prompts-202511220937.webp',
  },
  {
    id: 'fashion-glamour-portrait',
    title: {
      en: 'Fashion Photography - Glamour Portrait',
      zh: '時尚攝影 - 魅力肖像',
    },
    description: {
      en: 'High-fashion glamour portrait with costume emphasis',
      zh: '強調服裝的高級時尚魅力肖像',
    },
    usage: {
      en: '📝 How to use: Upload a portrait. The AI will create a Victoria\'s Secret style glamour shot with dramatic lighting emphasizing costume details, crystals, and shine. Face remains unchanged.',
      zh: '📝 使用方法：上傳肖像。AI 會創建維多利亞的秘密風格魅力照，戲劇性燈光強調服裝細節、水晶和光澤。面部保持不變。',
    },
    prompt: 'The background is a darkly lit room, probably under the podium. The main emphasis is on the girl\'s face and the details of her costume. Emphasize the expressiveness of the gaze and the luxurious look of the outfit. The photo is lit by a flash from the camera, which emphasizes the shine of the beads and crystals on the corset, as well as the girl\'s shiny skin. Victoria\'s Secret style: sensuality, luxury, glamour. Very detailed. Important: do not change the face.',
    category: 'portrait',
    tags: ['AI Portrait', 'AI Costumes', 'Fashion', 'Glamour'],
    imageUrl: 'https://pub-75de598aba1c45faa2b7c57c5f262f78.r2.dev/assets3/prompts-202511220930.webp',
  },
  {
    id: 'landmark-blueprint',
    title: {
      en: 'Landmark Blueprint Infographic',
      zh: '地標藍圖資訊圖',
    },
    description: {
      en: 'Educational architectural overlay combining photography and schematics',
      zh: '結合攝影和示意圖的教育性建築疊加',
    },
    usage: {
      en: '📝 How to use: Replace [LANDMARK] with any famous building (Eiffel Tower, Taj Mahal, etc.). Creates an educational infographic with blueprint-style annotations over real photos.',
      zh: '📝 使用方法：將 [LANDMARK] 替換為任何著名建築（艾菲爾鐵塔、泰姬陵等）。在真實照片上創建帶有藍圖風格註釋的教育資訊圖。',
    },
    prompt: 'Create an infographic image of [LANDMARK], combining a real photograph of the landmark with blueprint-style technical annotations and diagrams overlaid on the image. Include the title "[LANDMARK]" in a hand-drawn box in the corner. Add white chalk-style sketches showing key structural data, important measurements, material quantities, internal diagrams, load-flow arrows, cross-sections, floor plans, and notable architectural or engineering features. Style: blueprint aesthetic with white line drawings on the photograph, technical/architectural annotation style, educational infographic feel, with the real environment visible behind the annotations.',
    category: 'technical-illustration',
    tags: ['AI Design', 'Architecture', 'Educational', 'Infographic'],
    imageUrl: 'https://pub-75de598aba1c45faa2b7c57c5f262f78.r2.dev/assets3/prompts-20251122.webp',
  },
  // Keep original prompts
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
  {
    id: 'day-of-dead-costume',
    title: {
      en: 'Day of the Dead Costume',
      zh: '亡靈節服裝',
    },
    description: {
      en: 'Cultural costume transformation with authentic styling',
      zh: '具有真實風格的文化服裝轉換',
    },
    usage: {
      en: '📝 How to use: Upload a portrait. The AI will transform it with intricate Day of the Dead (Día de Muertos) sugar skull face paint, traditional Mexican dress, and festive decorations while preserving facial structure.',
      zh: '📝 使用方法：上傳肖像。AI 會將其轉換為精緻的亡靈節糖骷髏臉部彩繪、傳統墨西哥服裝和節日裝飾，同時保留面部結構。',
    },
    prompt: 'Dress the subject as a Day of the Dead (Día de Muertos) character with intricate sugar skull face paint featuring colorful floral patterns. Traditional Mexican dress with vibrant colors and flower crown. Surrounded by marigold flowers, candles, and festive decorations. Preserve facial structure. Colorful, celebration-style photography.',
    category: 'costume-character',
    tags: ['AI Costumes', 'AI Halloween', 'Cultural', 'Character'],
    imageUrl: 'https://pub-75de598aba1c45faa2b7c57c5f262f78.r2.dev/assets3/nano-banana-prompts-9.webp',
  },
  {
    id: 'dark-angel-transformation',
    title: {
      en: 'Dark Angel Transformation',
      zh: '黑暗天使轉換',
    },
    description: {
      en: 'Gothic fantasy character transformation',
      zh: '哥特式幻想角色轉換',
    },
    usage: {
      en: '📝 How to use: Upload a portrait. Creates a dramatic dark angel character with large black wings, gothic attire, and ethereal makeup in a misty cemetery setting with cinematic lighting.',
      zh: '📝 使用方法：上傳肖像。創建戲劇性的黑暗天使角色，配有大型黑色翅膀、哥特式服裝和空靈妝容，場景設定在霧氣瀰漫的墓地，配以電影燈光。',
    },
    prompt: 'Transform the person into a dark angel with large black feathered wings, gothic black dress or suit with silver accents. Add ethereal makeup with dark smokey eyes. Place in a misty cemetery at twilight with gothic architecture in background. Keep identity consistent. Dramatic cinematic lighting with rim light effect.',
    category: 'costume-character',
    tags: ['AI Costumes', 'Character', 'Gothic', 'Fantasy'],
    imageUrl: 'https://pub-75de598aba1c45faa2b7c57c5f262f78.r2.dev/assets3/nano-banana-prompts-8.webp',
  },
  {
    id: 'halloween-pumpkin-costume',
    title: {
      en: 'Halloween Pumpkin Costume',
      zh: '萬聖節南瓜服裝',
    },
    description: {
      en: 'Festive seasonal costume design for family-appropriate use',
      zh: '適合家庭的節日季節性服裝設計',
    },
    usage: {
      en: '📝 How to use: Upload a portrait. Creates a cute Halloween pumpkin character costume with Jack-o\'-lantern design, surrounded by autumn decorations. Warm, playful, and family-friendly style.',
      zh: '📝 使用方法：上傳肖像。創建可愛的萬聖節南瓜角色服裝，配有傑克南瓜燈設計，周圍環繞秋季裝飾。溫暖、有趣且適合家庭的風格。',
    },
    prompt: 'Create a cute Halloween pumpkin character costume - orange pumpkin body suit with green vine details and Jack-o\'-lantern face design. The subject holds mini pumpkins and is surrounded by autumn leaves, hay bales, and Halloween decorations. Maintain facial features unchanged. Warm, cozy lighting. Playful and family-friendly style.',
    category: 'costume-character',
    tags: ['AI Halloween', 'AI Costumes', 'Festive', 'Family-Friendly'],
    imageUrl: 'https://pub-75de598aba1c45faa2b7c57c5f262f78.r2.dev/assets3/nano-banana-prompts-7.webp',
  },
];
