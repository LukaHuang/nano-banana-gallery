'use client';

interface HeaderProps {
  language: 'en' | 'zh';
  onLanguageToggle: () => void;
  onShowHelp: () => void;
}

export default function Header({ language, onLanguageToggle, onShowHelp }: HeaderProps) {
  return (
    <header className="border-b-3 sm:border-b-4 border-current mb-6 sm:mb-8 pb-4 sm:pb-6">
      <div className="flex flex-col md:flex-row justify-between items-center mb-3 sm:mb-4 gap-3 sm:gap-4">
        <h1 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-bold scanline-effect leading-tight sm:leading-relaxed py-1 text-center md:text-left">
          {language === 'en' ? 'Nano Banana Prompt Gallery' : 'Nano Banana 提示詞畫廊'}
        </h1>
        <div className="flex gap-2 shrink-0">
          <button
            onClick={onShowHelp}
            className="retro-button text-xs sm:text-sm"
          >
            {language === 'en' ? '❓ Help' : '❓ 幫助'}
          </button>
          <button
            onClick={onLanguageToggle}
            className="retro-button text-xs sm:text-sm"
          >
            {language === 'en' ? '中文' : 'EN'}
          </button>
        </div>
      </div>
      <p className="text-xs sm:text-sm md:text-base lg:text-lg opacity-80 text-center md:text-left">
        {language === 'en'
          ? 'A curated collection of AI prompts for creative projects'
          : '精選 AI 提示詞集合，用於創意專案'}
      </p>
    </header>
  );
}
