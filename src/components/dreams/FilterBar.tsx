import React from 'react';
import { Search, Sparkles, X, ArrowUpDown } from 'lucide-react';
import type { DreamFilters, Mood } from '../../interfaces/dream';
import { MOOD_LIST } from '../../constants/moods';

interface FilterBarProps {
  filters: DreamFilters;
  onChangeFilters: (newFilters: DreamFilters) => void;
  availableTags?: string[];
}

export const FilterBar: React.FC<FilterBarProps> = ({
  filters,
  onChangeFilters,
}) => {
  const hasActiveFilters =
    filters.search || filters.tag || filters.mood || filters.onlyLucid;

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChangeFilters({ ...filters, search: e.target.value });
  };

  const handleMoodClick = (mood: Mood | null) => {
    onChangeFilters({
      ...filters,
      mood: filters.mood === mood ? null : mood,
    });
  };

  const handleTagClick = (tag: string | null) => {
    onChangeFilters({
      ...filters,
      tag: filters.tag === tag ? null : tag,
    });
  };

  const handleClearFilters = () => {
    onChangeFilters({
      search: '',
      tag: null,
      mood: null,
      onlyLucid: false,
      sort: 'newest',
    });
  };

  return (
    <div className="flex flex-col gap-3 p-4 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl shadow-xs transition-colors">
      {/* Üst Satır: Arama ve Sıralama */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
        <div className="relative flex-1">
          <Search
            size={18}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            type="text"
            value={filters.search}
            onChange={handleSearchChange}
            placeholder="Rüya başlığı, sembol, yer veya his ara..."
            className="w-full pl-10 pr-9 py-2 rounded-xl text-xs sm:text-sm bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:bg-white dark:focus:bg-slate-900 transition-all"
          />
          {filters.search && (
            <button
              onClick={() => onChangeFilters({ ...filters, search: '' })}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              <X size={15} />
            </button>
          )}
        </div>

        {/* Lucid Filtresi & Sıralama */}
        <div className="flex items-center gap-2">
          <button
            onClick={() =>
              onChangeFilters({ ...filters, onlyLucid: !filters.onlyLucid })
            }
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
              filters.onlyLucid
                ? 'bg-amber-500 text-white border-amber-600 shadow-sm'
                : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
            }`}
          >
            <Sparkles size={14} className={filters.onlyLucid ? 'animate-spin' : ''} />
            <span>Bilinçli Rüyalar</span>
          </button>

          <button
            onClick={() =>
              onChangeFilters({
                ...filters,
                sort: filters.sort === 'newest' ? 'oldest' : 'newest',
              })
            }
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all cursor-pointer shrink-0"
            title="Sıralamayı Değiştir"
          >
            <ArrowUpDown size={14} />
            <span>{filters.sort === 'newest' ? 'En Yeni' : 'En Eski'}</span>
          </button>

          {hasActiveFilters && (
            <button
              onClick={handleClearFilters}
              className="flex items-center gap-1 px-2.5 py-2 rounded-xl text-xs font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors cursor-pointer"
              title="Filtreleri Temizle"
            >
              <X size={14} />
              <span className="hidden sm:inline">Temizle</span>
            </button>
          )}
        </div>
      </div>

      {/* Alt Satır: Mood Çipleri */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-0.5 no-scrollbar">
        <span className="text-[11px] font-semibold text-slate-400 dark:text-slate-500 shrink-0 mr-1">
          Ruh Hali:
        </span>
        <button
          onClick={() => handleMoodClick(null)}
          className={`px-2.5 py-1 rounded-lg text-xs font-medium shrink-0 transition-all cursor-pointer ${
            filters.mood === null
              ? 'bg-violet-600 text-white shadow-xs'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
          }`}
        >
          Tümü
        </button>
        {MOOD_LIST.map(m => {
          const isSelected = filters.mood === m.type;
          return (
            <button
              key={m.type}
              onClick={() => handleMoodClick(m.type)}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium shrink-0 border transition-all cursor-pointer ${
                isSelected
                  ? `${m.bgLight} ${m.textLight} ${m.borderLight} ${m.bgDark} ${m.textDark} ${m.borderDark} ring-1 ring-violet-500 shadow-xs font-bold`
                  : 'bg-slate-50 dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100'
              }`}
            >
              <span>{m.emoji}</span>
              <span className="hidden sm:inline">{m.label.split(' ')[0]}</span>
            </button>
          );
        })}
      </div>

      {/* Aktif Etiket Filtresi Varsa Göster */}
      {filters.tag && (
        <div className="flex items-center gap-2 pt-1 border-t border-slate-100 dark:border-slate-800 text-xs">
          <span className="text-slate-500">Seçili Etiket:</span>
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-violet-100 text-violet-800 dark:bg-violet-950 dark:text-violet-300 font-medium">
            #{filters.tag}
            <button
              onClick={() => handleTagClick(null)}
              className="hover:text-rose-500"
            >
              <X size={12} />
            </button>
          </span>
        </div>
      )}
    </div>
  );
};
