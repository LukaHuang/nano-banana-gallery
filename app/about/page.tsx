'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function AboutPage() {
  const [language, setLanguage] = useState<'en' | 'zh'>('zh');

  return (
    <div className="min-h-screen p-6 md:p-12">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <Link href="/" className="retro-button">
            ← {language === 'en' ? 'Back to Gallery' : '返回圖庫'}
          </Link>
          <button
            onClick={() => setLanguage(language === 'en' ? 'zh' : 'en')}
            className="retro-button"
          >
            {language === 'en' ? '中文' : 'EN'}
          </button>
        </div>

        <div className="retro-divider mb-8" />

        {/* Main Content */}
        <div className="retro-card p-8 mb-8">
          {/* Logo Section */}
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">🍌</div>
            <h1 className="text-4xl md:text-5xl font-black mb-4">
              {language === 'en' ? 'NANOBANA PROMPT' : 'NANOBANA PROMPT'}
            </h1>
            <p className="text-xl opacity-70">
              {language === 'en'
                ? 'AI Prompt Gallery & Community'
                : 'AI 提示詞圖庫與社群'}
            </p>
          </div>

          <div className="retro-divider my-8" />

          {/* Introduction */}
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-black mb-3 border-b-3 border-current pb-2">
                {language === 'en' ? '📖 ABOUT' : '📖 關於'}
              </h2>
              <div className="space-y-3 text-base leading-relaxed">
                {language === 'en' ? (
                  <>
                    <p>
                      <strong>nanobananaprompt.org</strong> is a comprehensive AI prompt library and community platform dedicated to sharing high-quality prompts for various AI image generation tools.
                    </p>
                    <p>
                      The platform features carefully curated prompts covering diverse categories including:
                    </p>
                    <ul className="list-disc list-inside ml-4 space-y-1">
                      <li>Image Editing & Enhancement</li>
                      <li>Portrait & Character Design</li>
                      <li>Product Design & Visualization</li>
                      <li>Technical Illustration & Infographics</li>
                      <li>Style Transfer & Artistic Effects</li>
                      <li>And much more...</li>
                    </ul>
                  </>
                ) : (
                  <>
                    <p>
                      <strong>nanobananaprompt.org</strong> 是一個全面的 AI 提示詞圖庫和社群平台，致力於分享各種 AI 圖像生成工具的高品質提示詞。
                    </p>
                    <p>
                      該平台精心策劃的提示詞涵蓋多種類別，包括：
                    </p>
                    <ul className="list-disc list-inside ml-4 space-y-1">
                      <li>圖像編輯與增強</li>
                      <li>肖像與角色設計</li>
                      <li>產品設計與視覺化</li>
                      <li>技術插圖與資訊圖表</li>
                      <li>風格轉換與藝術效果</li>
                      <li>以及更多...</li>
                    </ul>
                  </>
                )}
              </div>
            </div>

            <div className="retro-divider" />

            {/* Features */}
            <div>
              <h2 className="text-2xl font-black mb-3 border-b-3 border-current pb-2">
                {language === 'en' ? '✨ FEATURES' : '✨ 特色'}
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="retro-card p-4 bg-accent bg-opacity-20">
                  <div className="text-2xl mb-2">🎨</div>
                  <h3 className="font-bold mb-1">
                    {language === 'en' ? 'Diverse Categories' : '多樣化分類'}
                  </h3>
                  <p className="text-sm opacity-70">
                    {language === 'en'
                      ? 'From photo editing to character design, covering all creative needs'
                      : '從照片編輯到角色設計，涵蓋所有創意需求'}
                  </p>
                </div>

                <div className="retro-card p-4 bg-accent bg-opacity-20">
                  <div className="text-2xl mb-2">🌍</div>
                  <h3 className="font-bold mb-1">
                    {language === 'en' ? 'Bilingual Support' : '雙語支援'}
                  </h3>
                  <p className="text-sm opacity-70">
                    {language === 'en'
                      ? 'All prompts include both English and Traditional Chinese'
                      : '所有提示詞包含英文和繁體中文'}
                  </p>
                </div>

                <div className="retro-card p-4 bg-accent bg-opacity-20">
                  <div className="text-2xl mb-2">📸</div>
                  <h3 className="font-bold mb-1">
                    {language === 'en' ? 'Visual Examples' : '視覺範例'}
                  </h3>
                  <p className="text-sm opacity-70">
                    {language === 'en'
                      ? 'Each prompt includes example images showing results'
                      : '每個提示詞都包含展示結果的範例圖片'}
                  </p>
                </div>

                <div className="retro-card p-4 bg-accent bg-opacity-20">
                  <div className="text-2xl mb-2">📝</div>
                  <h3 className="font-bold mb-1">
                    {language === 'en' ? 'Usage Instructions' : '使用說明'}
                  </h3>
                  <p className="text-sm opacity-70">
                    {language === 'en'
                      ? 'Detailed guides on how to use each prompt effectively'
                      : '詳細指南教你如何有效使用每個提示詞'}
                  </p>
                </div>
              </div>
            </div>

            <div className="retro-divider" />

            {/* Links */}
            <div>
              <h2 className="text-2xl font-black mb-3 border-b-3 border-current pb-2">
                {language === 'en' ? '🔗 LINKS' : '🔗 連結'}
              </h2>
              <div className="space-y-3">
                <a
                  href="https://nanobananaprompt.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="retro-button w-full text-center block"
                >
                  🍌 {language === 'en' ? 'Visit nanobananaprompt.org' : '前往 nanobananaprompt.org'}
                </a>
                <a
                  href="https://nanobananaprompt.org/zh-tw/prompts/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="retro-button retro-button-secondary w-full text-center block"
                >
                  📚 {language === 'en' ? 'Browse All Prompts' : '瀏覽所有提示詞'}
                </a>
              </div>
            </div>

            <div className="retro-divider" />

            {/* Credits */}
            <div className="text-center text-sm opacity-70">
              <p className="mb-2">
                {language === 'en'
                  ? 'All prompts on this site are sourced from'
                  : '本站所有提示詞均來自'}
              </p>
              <p className="font-bold text-lg">
                🍌 nanobananaprompt.org
              </p>
              <p className="mt-4">
                {language === 'en'
                  ? 'We thank the nanobana team for their amazing work in curating and sharing these prompts with the community.'
                  : '我們感謝 nanobana 團隊在策劃和與社群分享這些提示詞方面的出色工作。'}
              </p>
            </div>
          </div>
        </div>

        {/* Back to Gallery */}
        <div className="text-center">
          <Link href="/" className="retro-button">
            {language === 'en' ? '← Back to Prompt Gallery' : '← 返回提示詞圖庫'}
          </Link>
        </div>
      </div>
    </div>
  );
}
