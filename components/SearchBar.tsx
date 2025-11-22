'use client';

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  language: 'en' | 'zh';
}

export default function SearchBar({
  searchTerm,
  onSearchChange,
  language,
}: SearchBarProps) {
  return (
    <div className="w-full">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder={
          language === 'en'
            ? 'Search prompts...'
            : '搜尋提示詞...'
        }
        className="retro-input"
      />
    </div>
  );
}
