import React from 'react';
import type { Dream } from '../../interfaces/dream';
import { MOODS } from '../../constants/moods';
import { formatRelativeTime, formatShortDate } from '../../utils/date';
import { Sparkles, Edit3, Trash2, Calendar, Clock, Hash } from 'lucide-react';

interface DreamCardProps {
  dream: Dream;
  onEdit: (dream: Dream) => void;
  onDelete: (id: string) => void;
  onSelectTag?: (tag: string) => void;
  onViewDetail?: (dream: Dream) => void;
}

export const DreamCard: React.FC<DreamCardProps> = ({
  dream,
  onEdit,
  onDelete,
  onSelectTag,
  onViewDetail,
}) => {
  const mood = MOODS[dream.mood] || MOODS.neutral;

  return (
    <article className="group relative flex flex-col justify-between p-5 sm:p-6 bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl shadow-xs hover:shadow-xl hover:border-violet-300 dark:hover:border-violet-700 transition-all duration-300">
      <div>
        {/* Üst Kısım: Mood, Lucid Rozeti ve Aksiyonlar */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2 flex-wrap">
            {/* Mood Rozeti */}
            <span
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${mood.bgLight} ${mood.textLight} ${mood.borderLight} ${mood.bgDark} ${mood.textDark} ${mood.borderDark}`}
            >
              <span>{mood.emoji}</span>
              <span>{mood.label.split(' ')[0]}</span>
            </span>

            {/* Lucid Rüya Rozeti */}
            {dream.isLucid && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800 shadow-xs">
                <Sparkles size={12} className="text-amber-500 fill-amber-400" />
                <span>Bilinçli Rüya</span>
              </span>
            )}
          </div>

          {/* Hızlı Aksiyonlar */}
          <div className="flex items-center gap-1 opacity-80 group-hover:opacity-100 transition-opacity">
            <button
              onClick={() => onEdit(dream)}
              title="Rüyayı Düzenle"
              className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 transition-colors cursor-pointer"
            >
              <Edit3 size={15} />
            </button>
            <button
              onClick={() => onDelete(dream.id)}
              title="Rüyayı Sil"
              className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/50 transition-colors cursor-pointer"
            >
              <Trash2 size={15} />
            </button>
          </div>
        </div>

        {/* Başlık */}
        <h3
          onClick={() => onViewDetail && onViewDetail(dream)}
          className="text-lg sm:text-xl font-bold text-slate-900 dark:text-slate-100 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors cursor-pointer leading-snug line-clamp-1"
        >
          {dream.title}
        </h3>

        {/* Tarih ve Göreceli Zaman (Moment.js) */}
        <div className="flex items-center gap-3 text-xs text-slate-400 dark:text-slate-500 mt-1.5 mb-3">
          <span className="inline-flex items-center gap-1 font-medium">
            <Calendar size={13} />
            <span>{formatShortDate(dream.date)}</span>
          </span>
          <span>•</span>
          <span className="inline-flex items-center gap-1 text-slate-500 dark:text-slate-400" title={new Date(dream.createdAt).toLocaleString('tr-TR')}>
            <Clock size={13} />
            <span>{formatRelativeTime(dream.createdAt)}</span>
          </span>
        </div>

        {/* İçerik Özeti */}
        <p
          onClick={() => onViewDetail && onViewDetail(dream)}
          className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-3 mb-4 cursor-pointer"
        >
          {dream.content}
        </p>
      </div>

      {/* Alt Kısım: Etiket Çipleri */}
      {dream.tags.length > 0 && (
        <div className="flex items-center gap-1.5 flex-wrap pt-3 border-t border-slate-100 dark:border-slate-800/80">
          {dream.tags.map(tag => (
            <button
              key={tag}
              onClick={() => onSelectTag && onSelectTag(tag)}
              className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-md text-[11px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-violet-100 hover:text-violet-700 dark:hover:bg-slate-700 dark:hover:text-slate-200 transition-colors cursor-pointer"
            >
              <Hash size={11} className="text-slate-400" />
              <span>{tag}</span>
            </button>
          ))}
        </div>
      )}
    </article>
  );
};
