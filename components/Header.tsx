'use client';

interface HeaderProps {
  language: 'en' | 'zh';
  onLanguageToggle: () => void;
  onShowHelp: () => void;
}

export default function Header({ language, onLanguageToggle, onShowHelp }: HeaderProps) {
  return (
    <header className="border-b-4 border-current mb-8 pb-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold scanline-effect leading-relaxed py-1">
          {language === 'en' ? 'Nano Banana Prompt Gallery' : 'Nano Banana 提示詞畫廊'}
        </h1>
        <div className="flex gap-2">
          <button
            onClick={onShowHelp}
            className="retro-button text-sm"
          >
            {language === 'en' ? '❓ Help' : '❓ 幫助'}
          </button>
          <button
            onClick={onLanguageToggle}
            className="retro-button text-sm"
          >
            {language === 'en' ? '中文' : 'EN'}
          </button>
        </div>
      </div>
      <p className="text-sm md:text-lg opacity-80">
        {language === 'en'
          ? 'A curated collection of AI prompts for creative projects'
          : '精選 AI 提示詞集合，用於創意專案'}
      </p>
    </header>
  );
}
