import React from 'react';
import type { Dream } from '../../interfaces/dream';
import { MOODS } from '../../constants/moods';
import { formatFullDate, formatRelativeTime } from '../../utils/date';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Sparkles, Calendar, Clock, Hash, Edit3, Trash2 } from 'lucide-react';

interface DreamDetailModalProps {
  dream: Dream | null;
  isOpen: boolean;
  onClose: () => void;
  onEdit: (dream: Dream) => void;
  onDelete: (id: string) => void;
}

export const DreamDetailModal: React.FC<DreamDetailModalProps> = ({
  dream,
  isOpen,
  onClose,
  onEdit,
  onDelete,
}) => {
  if (!dream) return null;

  const mood = MOODS[dream.mood] || MOODS.neutral;

  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="xl">
      <div className="flex flex-col gap-5">
        {/* Üst Kısım: Mood & Lucid Rozeti */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 flex-wrap">
            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${mood.bgLight} ${mood.textLight} ${mood.borderLight} ${mood.bgDark} ${mood.textDark} ${mood.borderDark}`}
            >
              <span className="text-base">{mood.emoji}</span>
              <span>{mood.label}</span>
            </span>

            {dream.isLucid && (
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
                <Sparkles size={13} className="text-amber-500 fill-amber-400" />
                <span>Bilinçli Rüya</span>
              </span>
            )}
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => {
                onClose();
                onEdit(dream);
              }}
              title="Düzenle"
              className="p-2 rounded-xl text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <Edit3 size={17} />
            </button>
            <button
              onClick={() => {
                onClose();
                onDelete(dream.id);
              }}
              title="Sil"
              className="p-2 rounded-xl text-slate-500 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <Trash2 size={17} />
            </button>
          </div>
        </div>

        {/* Başlık */}
        <div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-slate-100 tracking-tight leading-snug">
            {dream.title}
          </h2>
          <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400 mt-2">
            <span className="flex items-center gap-1 font-semibold">
              <Calendar size={13} />
              <span>{formatFullDate(dream.date)}</span>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1" title={new Date(dream.createdAt).toLocaleString('tr-TR')}>
              <Clock size={13} />
              <span>{formatRelativeTime(dream.createdAt)}</span>
            </span>
          </div>
        </div>

        {/* İçerik */}
        <div className="p-5 rounded-2xl bg-slate-50/80 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-sm sm:text-base text-slate-700 dark:text-slate-200 leading-relaxed whitespace-pre-wrap font-normal">
          {dream.content}
        </div>

        {/* Etiketler */}
        {dream.tags.length > 0 && (
          <div className="flex items-center gap-1.5 flex-wrap pt-2">
            {dream.tags.map((tag: string) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold bg-violet-50 text-violet-700 dark:bg-violet-950/60 dark:text-violet-300 border border-violet-200 dark:border-violet-800"
              >
                <Hash size={12} className="text-violet-400" />
                <span>{tag}</span>
              </span>
            ))}
          </div>
        )}

        {/* Kapat Butonu */}
        <div className="flex justify-end pt-3 border-t border-slate-100 dark:border-slate-800">
          <Button variant="secondary" onClick={onClose}>
            Kapat
          </Button>
        </div>
      </div>
    </Modal>
  );
};
