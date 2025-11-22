'use client';

import { useState, useMemo, useEffect } from 'react';
import { Prompt, Source } from '@/data/prompts';
import PromptCard from '@/components/PromptCard';
import CategoryFilter from '@/components/CategoryFilter';
import SearchBar from '@/components/SearchBar';
import Header from '@/components/Header';
import HowToUse from '@/components/HowToUse';
import Link from 'next/link';

export default function Home() {
  const [language, setLanguage] = useState<'en' | 'zh'>('zh');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showHelp, setShowHelp] = useState(false);
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPrompts = async () => {
      try {
        const res = await fetch('/api/prompts');
        const data = await res.json();
        setPrompts(data);
      } catch (error) {
        console.error('Failed to fetch prompts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPrompts();
  }, []);

  const filteredPrompts = useMemo(() => {
    return prompts.filter((prompt) => {
      const matchesCategory =
        selectedCategory === 'all' || prompt.category === selectedCategory;

      const matchesSearch =
        searchTerm === '' ||
        prompt.title.en.toLowerCase().includes(searchTerm.toLowerCase()) ||
        prompt.title.zh.includes(searchTerm) ||
        prompt.description.en.toLowerCase().includes(searchTerm.toLowerCase()) ||
        prompt.description.zh.includes(searchTerm) ||
        prompt.tags.some((tag) =>
          tag.toLowerCase().includes(searchTerm.toLowerCase())
        ) ||
        prompt.prompt.toLowerCase().includes(searchTerm.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [prompts, selectedCategory, searchTerm]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl font-bold">
          {language === 'en' ? 'Loading...' : '載入中...'}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 md:p-12">
      <div className="max-w-7xl mx-auto">
        <Header
          language={language}
          onLanguageToggle={() => setLanguage(language === 'en' ? 'zh' : 'en')}
          onShowHelp={() => setShowHelp(true)}
        />

        {showHelp && (
          <HowToUse
            language={language}
            onClose={() => setShowHelp(false)}
          />
        )}

        <div className="mb-8 space-y-6">
          <SearchBar
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            language={language}
          />

          <CategoryFilter
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            language={language}
          />
        </div>

        <div className="retro-divider" />

        <div className="mb-4 text-sm font-bold">
          {language === 'en'
            ? `Showing ${filteredPrompts.length} ${filteredPrompts.length === 1 ? 'prompt' : 'prompts'}`
            : `顯示 ${filteredPrompts.length} 個提示詞`}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPrompts.map((prompt) => (
            <PromptCard key={prompt.id} prompt={prompt} language={language} />
          ))}
        </div>

        {filteredPrompts.length === 0 && (
          <div className="text-center py-12 retro-card">
            <p className="text-xl font-bold">
              {language === 'en'
                ? 'No prompts found. Try a different search or category.'
                : '未找到提示詞。請嘗試其他搜尋或分類。'}
            </p>
          </div>
        )}

        <footer className="mt-12 pt-6 border-t-4 border-current text-center space-y-4">
          <p className="text-sm opacity-70">
            {language === 'en'
              ? 'All prompts sourced from nanobananaprompt.org'
              : '所有提示詞來源：nanobananaprompt.org'}
          </p>
          <div>
            <Link href="/about" className="retro-button inline-block">
              🍌 {language === 'en' ? 'About nanobana' : '關於 nanobana'}
            </Link>
          </div>
        </footer>
      </div>
    </div>
  );
}
