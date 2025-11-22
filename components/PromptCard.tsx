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
  const [imageError, setImageError] = useState(false);

  // Find the source for this prompt
  const source = prompt.sourceId ? sources.find(s => s.id === prompt.sourceId) : null;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(prompt.prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="retro-card p-4 sm:p-6 flex flex-col h-full relative">
      {/* Example Image */}
      <div className="mb-3 sm:mb-4 border-3 border-current overflow-hidden relative bg-gradient-to-br from-purple-400 via-pink-400 to-orange-400">
        {!imageError ? (
          <Image
            src={prompt.imageUrl}
            alt={prompt.title[language]}
            width={400}
            height={300}
            className="w-full h-40 sm:h-48 md:h-52 object-cover"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-40 sm:h-48 md:h-52 flex items-center justify-center text-3xl sm:text-4xl">
            🍌
          </div>
        )}
      </div>

      {/* Title */}
      <h3 className="text-lg sm:text-xl font-bold mb-2 leading-tight">
        {prompt.title[language]}
      </h3>

      {/* Description */}
      <p className="text-xs sm:text-sm mb-3 opacity-80 leading-relaxed">
        {(() => {
          const desc = prompt.description[language];
          // Remove " - Created by ..." or " - 由 ... 創建"
          return desc
            .replace(/ - Created by.*$/, '')
            .replace(/ - 由.*創建$/, '');
        })()}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4">
        {prompt.tags.map((tag) => (
          <span key={tag} className="retro-badge">
            {tag}
          </span>
        ))}
      </div>

      {/* Usage Instructions */}
      <div className="mb-3 sm:mb-4 p-2 sm:p-3 bg-accent bg-opacity-30 border-2 border-current">
        <p className="text-xs font-mono whitespace-pre-wrap leading-relaxed">
          {prompt.usage[language]}
        </p>
      </div>

      {/* Prompt Preview/Full */}
      <div className="mb-3 sm:mb-4 flex-grow">
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs sm:text-sm font-bold uppercase">
            {language === 'en' ? 'Prompt' : '提示詞'}
          </span>
          <button
            onClick={() => setShowFullPrompt(!showFullPrompt)}
            className="text-xs sm:text-sm underline cursor-pointer min-h-[44px] flex items-center"
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
          className={`bg-gray-100 dark:bg-gray-800 p-2 sm:p-3 border-2 border-current overflow-y-auto ${showFullPrompt ? 'max-h-48 sm:max-h-64' : 'max-h-16 sm:max-h-20'
            } transition-all`}
        >
          <code className="text-xs whitespace-pre-wrap font-mono leading-relaxed text-white">
            {prompt.prompt}
          </code>
        </div>
      </div>

      {/* Author & Source Label */}
      <div className="mb-3 sm:mb-4 flex flex-wrap justify-end items-center gap-1 text-xs font-bold opacity-70">
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
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-2 mt-auto">
        <button
          onClick={copyToClipboard}
          className="flex-1 retro-button flex items-center justify-center gap-2 py-3 sm:py-2.5 text-sm font-bold"
        >
          {copied ? (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              {language === 'en' ? 'Copied!' : '已複製！'}
            </>
          ) : (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
              </svg>
              {language === 'en' ? 'Copy' : '複製'}
            </>
          )}
        </button>
        <a
          href="https://aistudio.google.com/"
          onClick={async (e) => {
            e.preventDefault();
            await copyToClipboard();
            setTimeout(() => {
              window.open('https://aistudio.google.com/', '_blank');
            }, 1000);
          }}
          className="flex-1 retro-button flex items-center justify-center gap-2 py-3 sm:py-2.5 text-sm font-bold bg-accent text-white cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
              clipRule="evenodd"
            />
          </svg>
          <span className="hidden xs:inline">Google AI Studio</span>
          <span className="inline xs:hidden">AI Studio</span>
        </a>
      </div>

      {/* Copied Overlay */}
      {copied && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/10 backdrop-blur-[1px] transition-all duration-200">
          <div className="bg-[#8bd3dd] border-3 sm:border-4 border-[#001858] text-[#001858] px-4 sm:px-6 py-2 sm:py-3 font-bold shadow-[3px_3px_0_#001858] sm:shadow-[4px_4px_0_#001858] flex items-center gap-2 sm:gap-3 transform scale-110 animate-in zoom-in duration-200">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 sm:h-6 sm:w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={3}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
            <span className="text-base sm:text-lg tracking-wider">
              {language === 'en' ? 'COPIED!' : '已複製！'}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
