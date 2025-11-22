'use client';

import { categories } from '@/data/prompts';

interface CategoryFilterProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  language: 'en' | 'zh';
}

export default function CategoryFilter({
  selectedCategory,
  onCategoryChange,
  language,
}: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-3">
      <button
        onClick={() => onCategoryChange('all')}
        className={`retro-button ${
          selectedCategory === 'all' ? '' : 'retro-button-secondary'
        }`}
      >
        {language === 'en' ? 'All' : '全部'}
      </button>
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onCategoryChange(category.id)}
          className={`retro-button ${
            selectedCategory === category.id ? '' : 'retro-button-secondary'
          }`}
        >
          {category[language]}
        </button>
      ))}
    </div>
  );
}
