'use client';

import { useState, useMemo, useEffect } from 'react';
import { Prompt, Source } from '@/data/prompts';
import PromptCard from '@/components/PromptCard';
import CategoryFilter from '@/components/CategoryFilter';
import SearchBar from '@/components/SearchBar';
import Header from '@/components/Header';
import HowToUse from '@/components/HowToUse';
import Link from 'next/link';

const ITEMS_PER_PAGE = 12;

export default function Home() {
  const [language, setLanguage] = useState<'en' | 'zh'>('zh');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showHelp, setShowHelp] = useState(false);
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

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

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, searchTerm]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredPrompts.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedPrompts = filteredPrompts.slice(startIndex, endIndex);

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

        <div className="mb-4 flex justify-between items-center">
          <div className="text-sm font-bold">
            {language === 'en'
              ? `Showing ${startIndex + 1}-${Math.min(endIndex, filteredPrompts.length)} of ${filteredPrompts.length} ${filteredPrompts.length === 1 ? 'prompt' : 'prompts'}`
              : `顯示 ${startIndex + 1}-${Math.min(endIndex, filteredPrompts.length)} / 共 ${filteredPrompts.length} 個提示詞`}
          </div>
          {totalPages > 1 && (
            <div className="text-sm font-bold">
              {language === 'en' ? `Page ${currentPage} of ${totalPages}` : `第 ${currentPage} / ${totalPages} 頁`}
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginatedPrompts.map((prompt) => (
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

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="mt-8 flex justify-center items-center gap-2 flex-wrap">
            <button
              onClick={() => setCurrentPage(1)}
              disabled={currentPage === 1}
              className="retro-button px-4 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {language === 'en' ? 'First' : '首頁'}
            </button>
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="retro-button px-4 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {language === 'en' ? 'Previous' : '上一頁'}
            </button>

            {/* Page numbers */}
            <div className="flex gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter(page => {
                  // Show first page, last page, current page, and pages around current
                  return page === 1 ||
                    page === totalPages ||
                    Math.abs(page - currentPage) <= 1;
                })
                .map((page, index, array) => {
                  // Add ellipsis if there's a gap
                  const prevPage = array[index - 1];
                  const showEllipsis = prevPage && page - prevPage > 1;

                  return (
                    <div key={page} className="flex gap-1">
                      {showEllipsis && <span className="px-2 py-2">...</span>}
                      <button
                        onClick={() => setCurrentPage(page)}
                        className={`px-4 py-2 font-bold border-2 border-current transition-colors ${currentPage === page
                          ? 'bg-current text-white'
                          : 'bg-transparent hover:bg-current hover:bg-opacity-20'
                          }`}
                      >
                        {page}
                      </button>
                    </div>
                  );
                })}
            </div>

            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="retro-button px-4 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {language === 'en' ? 'Next' : '下一頁'}
            </button>
            <button
              onClick={() => setCurrentPage(totalPages)}
              disabled={currentPage === totalPages}
              className="retro-button px-4 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {language === 'en' ? 'Last' : '末頁'}
            </button>
          </div>
        )}

        <footer className="mt-12 pt-6 border-t-4 border-current text-center space-y-4">
          <p className="text-sm opacity-70">
            © 2025 LukaHuang. All rights reserved.
          </p>

        </footer>
      </div>
    </div>
  );
}
