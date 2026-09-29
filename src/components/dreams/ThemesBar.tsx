import React from 'react';
import type { TagStat } from '../../utils/stats';
import { Sparkles, Compass } from 'lucide-react';

interface ThemesBarProps {
  topTags: TagStat[];
  activeTag: string | null;
  onSelectTag: (tag: string | null) => void;
}

export const ThemesBar: React.FC<ThemesBarProps> = ({
  topTags,
  activeTag,
  onSelectTag,
}) => {
  if (topTags.length === 0) return null;

  return (
    <section className="p-4 sm:p-5 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl shadow-xs transition-colors">
      <div className="flex items-center justify-between gap-4 mb-3">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-violet-100 dark:bg-violet-950/60 text-violet-600 dark:text-violet-400">
            <Compass size={17} />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">
              Sık Görülen Temalar & Semboller
            </h4>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Bilinçaltının en çok tekrar ettiği desenler (Filtrelemek için tıkla)
            </p>
          </div>
        </div>

        {activeTag && (
          <button
            onClick={() => onSelectTag(null)}
            className="text-xs text-violet-600 dark:text-violet-400 hover:underline font-semibold cursor-pointer"
          >
            Filtreyi Kaldır
          </button>
        )}
      </div>

      {/* Yatay Kaydırılabilir Temalar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
        {topTags.map(item => {
          const isSelected = activeTag === item.tag;
          return (
            <button
              key={item.tag}
              onClick={() => onSelectTag(isSelected ? null : item.tag)}
              className={`flex items-center gap-2 px-3 py-2 rounded-xl border text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                isSelected
                  ? 'bg-violet-600 text-white border-violet-600 shadow-md scale-102'
                  : 'bg-slate-50 dark:bg-slate-800/80 border-slate-200/80 dark:border-slate-700/80 text-slate-700 dark:text-slate-300 hover:bg-violet-50 hover:border-violet-200 dark:hover:bg-slate-700'
              }`}
            >
              <Sparkles size={13} className={isSelected ? 'text-white' : 'text-violet-500'} />
              <span>#{item.tag}</span>
              <span
                className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                  isSelected
                    ? 'bg-white/20 text-white'
                    : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                }`}
              >
                {item.count}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
};
