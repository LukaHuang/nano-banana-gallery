'use client';

import { Prompt, sources } from '@/data/prompts';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface PromptCardProps {
  prompt: Prompt;
  language: 'en' | 'zh';
}

export default function PromptCard({ prompt, language }: PromptCardProps) {
  const [copied, setCopied] = useState(false);
  const [showFullPrompt, setShowFullPrompt] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastPosition, setToastPosition] = useState({ x: 0, y: 0 });
  const [imageError, setImageError] = useState(false);

  // Find the source for this prompt
  const source = prompt.sourceId ? sources.find(s => s.id === prompt.sourceId) : null;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(prompt.prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const openInAIStudio = (e: React.MouseEvent) => {
    // Get mouse position
    setToastPosition({ x: e.clientX, y: e.clientY });

    // Copy to clipboard
    navigator.clipboard.writeText(prompt.prompt);
    setCopied(true);
    setShowToast(true);

    // Show toast briefly, then open AI Studio
    setTimeout(() => {
      window.open('https://aistudio.google.com/app/prompts/new_chat', '_blank');

      // Hide toast after opening
      setTimeout(() => {
        setCopied(false);
        setShowToast(false);
      }, 1000);
    }, 1500);
  };

  return (
    <>
      {/* Toast Notification at cursor position */}
      {showToast && (
        <div
          className="fixed z-[9999] retro-badge bg-secondary text-foreground px-6 py-3 text-lg font-bold shadow-lg pointer-events-none animate-bounce"
          style={{
            left: `${toastPosition.x + 10}px`,
            top: `${toastPosition.y - 40}px`,
          }}
        >
          {language === 'en' ? '✓ Copied!' : '✓ 已複製！'}
        </div>
      )}

      <div className="retro-card p-6 flex flex-col h-full relative">
        {/* Example Image */}
        <div className="mb-4 border-3 border-current overflow-hidden relative bg-gradient-to-br from-purple-400 via-pink-400 to-orange-400">
          {!imageError ? (
            <Image
              src={prompt.imageUrl}
              alt={prompt.title[language]}
              width={600}
              height={400}
              className="w-full h-48 object-cover"
              unoptimized
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="w-full h-48 flex items-center justify-center bg-gradient-to-br from-purple-400 via-pink-400 to-orange-400">
              <div className="text-center text-white p-4">
                <div className="text-4xl mb-2">🍌</div>
                <div className="text-sm font-bold opacity-80">
                  {language === 'en' ? 'Image Preview' : '圖片預覽'}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold mb-2">
          {prompt.title[language]}
        </h3>

        {/* Description */}
        <p className="text-sm mb-3 opacity-80">
          {(() => {
            const desc = prompt.description[language];
            // Remove " - Created by ..." or " - 由 ... 創建"
            return desc
              .replace(/ - Created by.*$/, '')
              .replace(/ - 由.*創建$/, '');
          })()}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {prompt.tags.map((tag) => (
            <span key={tag} className="retro-badge text-xs">
              {tag}
            </span>
          ))}
        </div>

        {/* Usage Instructions */}
        <div className="mb-4 p-3 bg-accent bg-opacity-30 border-2 border-current">
          <p className="text-xs font-mono whitespace-pre-wrap">
            {prompt.usage[language]}
          </p>
        </div>

        {/* Prompt Preview/Full */}
        <div className="mb-4 flex-grow">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-bold uppercase">
              {language === 'en' ? 'Prompt' : '提示詞'}
            </span>
            <button
              onClick={() => setShowFullPrompt(!showFullPrompt)}
              className="text-xs underline cursor-pointer"
            >
              {showFullPrompt
                ? language === 'en'
                  ? 'Show Less'
                  : '收起'
                : language === 'en'
                  ? 'Show More'
                  : '展開'}
            </button>
          </div>
          <div
            className={`bg-gray-100 dark:bg-gray-800 p-3 border-2 border-current overflow-y-auto ${showFullPrompt ? 'max-h-64' : 'max-h-20'
              } transition-all`}
          >
            <code className="text-xs whitespace-pre-wrap font-mono">
              {prompt.prompt}
            </code>
          </div>
        </div>

        {/* Author & Source Label */}
        <div className="mb-4 flex justify-end items-center gap-1 text-xs font-bold opacity-70">
          {(() => {
            // Try to extract author from description
            const desc = prompt.description.en;
            const match = desc.match(/Created by (@[^\s(]+)/);
            const specificAuthor = match ? match[1] : null;

            return (
              <span className="flex items-center gap-1">
                {language === 'en' ? 'Source: ' : '來源：'}

                {/* Source Name */}
                <a
                  href={source?.url || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline hover:text-accent"
                  title={source?.description?.[language]}
                >
                  {source?.name === 'nanobana' ? 'nanobananaprompt.org' : (source?.name || 'nanobananaprompt.org')}
                </a>

                {/* Author (if specific) */}
                {specificAuthor && (
                  <>
                    <span> (</span>
                    <a
                      href={`https://x.com/${specificAuthor.replace('@', '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline hover:text-accent"
                    >
                      {specificAuthor}
                    </a>
                    <span>)</span>
                  </>
                )}
              </span>
            );
          })()}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 mt-auto">
          <button
            onClick={copyToClipboard}
            className={`retro-button flex-1 ${copied ? 'retro-button-secondary' : ''
              }`}
          >
            {copied
              ? language === 'en'
                ? '✓ Copied!'
                : '✓ 已複製！'
              : language === 'en'
                ? '📋 Copy'
                : '📋 複製'}
          </button>
          <button
            onClick={openInAIStudio}
            className="retro-button flex-1"
            title={
              language === 'en'
                ? 'Open in Google AI Studio (copies prompt)'
                : '在 Google AI Studio 中打開（複製提示詞）'
            }
          >
            {language === 'en' ? '🚀 AI Studio' : '🚀 AI Studio'}
          </button>
        </div>
      </div>
    </>
  );
}
