import React, { useState } from 'react';
import { X, Plus, Hash } from 'lucide-react';

interface TagInputProps {
  tags: string[];
  onChange: (tags: string[]) => void;
  suggestions?: string[];
}

export const TagInput: React.FC<TagInputProps> = ({
  tags,
  onChange,
  suggestions = ['uçmak', 'su', 'okyanus', 'gece', 'düşmek', 'kaçmak', 'ev', 'yolculuk', 'arkadaş'],
}) => {
  const [inputValue, setInputValue] = useState('');

  const addTag = (tagToAdd: string) => {
    const clean = tagToAdd.trim().toLowerCase().replace(/^#+/, '');
    if (clean && !tags.includes(clean)) {
      onChange([...tags, clean]);
    }
    setInputValue('');
  };

  const removeTag = (tagToRemove: string) => {
    onChange(tags.filter(t => t !== tagToRemove));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addTag(inputValue);
    } else if (e.key === 'Backspace' && !inputValue && tags.length > 0) {
      removeTag(tags[tags.length - 1]);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-wrap items-center gap-1.5 p-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 focus-within:ring-2 focus-within:ring-violet-500 focus-within:border-transparent transition-all">
        {tags.map(tag => (
          <span
            key={tag}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold bg-violet-50 dark:bg-violet-950/60 text-violet-700 dark:text-violet-300 border border-violet-200 dark:border-violet-800"
          >
            <Hash size={12} className="text-violet-400" />
            <span>{tag}</span>
            <button
              type="button"
              onClick={() => removeTag(tag)}
              className="hover:text-rose-500 rounded-full p-0.5 transition-colors cursor-pointer"
            >
              <X size={12} />
            </button>
          </span>
        ))}

        <input
          type="text"
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={() => inputValue && addTag(inputValue)}
          placeholder={tags.length === 0 ? 'Örn: uçmak, okyanus (Enter ile ekle)' : 'Etiket ekle...'}
          className="flex-1 min-w-[140px] border-none bg-transparent py-1 px-1.5 text-xs sm:text-sm text-slate-800 dark:text-slate-200 placeholder:text-slate-400 focus:outline-none"
        />
      </div>

      {/* Önerilen Temalar */}
      <div className="flex items-center gap-1.5 flex-wrap">
        <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
          Öneriler:
        </span>
        {suggestions
          .filter(s => !tags.includes(s))
          .slice(0, 6)
          .map(suggested => (
            <button
              key={suggested}
              type="button"
              onClick={() => addTag(suggested)}
              className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-md text-[11px] font-medium bg-slate-100 hover:bg-violet-100 text-slate-600 hover:text-violet-700 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-400 dark:hover:text-slate-200 transition-colors cursor-pointer"
            >
              <Plus size={10} />
              <span>#{suggested}</span>
            </button>
          ))}
      </div>
    </div>
  );
};
