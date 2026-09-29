import React, { useState } from 'react';
import type { Dream } from '../interfaces/dream';
import { MOODS } from '../constants/moods';
import { formatFullDate } from '../utils/date';
import { Sparkles, Calendar, ArrowLeft, Eye, Hash } from 'lucide-react';
import { Button } from '../components/ui/Button';

interface GalleryPageProps {
  dreams: Dream[];
  onBack: () => void;
  onViewDetail: (dream: Dream) => void;
}

export const GalleryPage: React.FC<GalleryPageProps> = ({
  dreams,
  onBack,
  onViewDetail,
}) => {
  const [filterType, setFilterType] = useState<'all' | 'lucid'>('all');

  const displayedDreams = filterType === 'lucid' ? dreams.filter(d => d.isLucid) : dreams;

  return (
    <div className="flex flex-col gap-6 py-4 animate-in fade-in duration-200">
      {/* Üst Başlık & Sekmeler */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200/80 dark:border-slate-800">
        <div>
          <Button
            variant="ghost"
            size="sm"
            icon={<ArrowLeft size={16} />}
            onClick={onBack}
            className="mb-2"
          >
            Ana Akışa Dön
          </Button>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-slate-100 tracking-tight">
            Rüya Galerisi & Koleksiyon
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Bilinçaltının görselleştirilmiş yolculuğu ve berrak rüya anları.
          </p>
        </div>

        {/* Galeri Filtre Hapları */}
        <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-xl self-start sm:self-auto border border-slate-200 dark:border-slate-700">
          <button
            onClick={() => setFilterType('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              filterType === 'all'
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            Tüm Rüyalar ({dreams.length})
          </button>
          <button
            onClick={() => setFilterType('lucid')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              filterType === 'lucid'
                ? 'bg-amber-500 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            <Sparkles size={13} />
            <span>Bilinçli Rüyalar ({dreams.filter(d => d.isLucid).length})</span>
          </button>
        </div>
      </div>

      {/* Galeri Kartları Grid */}
      {displayedDreams.length === 0 ? (
        <div className="py-16 text-center text-slate-400">
          Bu filtreye uygun kayıtlı rüya bulunamadı.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {displayedDreams.map(dream => {
            const mood = MOODS[dream.mood] || MOODS.neutral;
            return (
              <div
                key={dream.id}
                onClick={() => onViewDetail(dream)}
                className="group relative flex flex-col justify-between p-6 rounded-3xl bg-gradient-to-b from-white to-slate-50/50 dark:from-slate-900 dark:to-slate-900/60 border border-slate-200/80 dark:border-slate-800 hover:border-violet-400 dark:hover:border-violet-600 shadow-xs hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden"
              >
                {/* Arka plan dekoratif parıltı */}
                {dream.isLucid && (
                  <div className="absolute -top-12 -right-12 w-28 h-28 bg-amber-400/10 rounded-full blur-2xl pointer-events-none" />
                )}

                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${mood.bgLight} ${mood.textLight} ${mood.borderLight} ${mood.bgDark} ${mood.textDark} ${mood.borderDark}`}
                    >
                      <span>{mood.emoji}</span>
                      <span>{mood.label.split(' ')[0]}</span>
                    </span>

                    {dream.isLucid && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
                        <Sparkles size={11} className="text-amber-500 fill-amber-400" />
                        <span>Bilinçli</span>
                      </span>
                    )}
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors line-clamp-1 mb-2">
                    {dream.title}
                  </h3>

                  <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-4 leading-relaxed mb-4">
                    {dream.content}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80">
                  <div className="flex items-center justify-between text-[11px] text-slate-400 dark:text-slate-500">
                    <span className="flex items-center gap-1">
                      <Calendar size={12} />
                      <span>{formatFullDate(dream.date)}</span>
                    </span>
                    <span className="flex items-center gap-1 group-hover:text-violet-500 transition-colors">
                      <Eye size={12} />
                      <span>Detay</span>
                    </span>
                  </div>

                  {dream.tags.length > 0 && (
                    <div className="flex items-center gap-1 flex-wrap mt-2.5">
                      {dream.tags.slice(0, 3).map(tag => (
                        <span
                          key={tag}
                          className="inline-flex items-center gap-0.5 text-[10px] px-1.5 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                        >
                          <Hash size={10} />
                          <span>{tag}</span>
                        </span>
                      ))}
                      {dream.tags.length > 3 && (
                        <span className="text-[10px] text-slate-400">
                          +{dream.tags.length - 3}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
