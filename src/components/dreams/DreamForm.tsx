import React, { useState, useEffect } from 'react';
import type { Dream, Mood } from '../../interfaces/dream';
import { MoodPicker } from './MoodPicker';
import { TagInput } from './TagInput';
import { Button } from '../ui/Button';
import { getTodayInputDate } from '../../utils/date';
import { Sparkles, Calendar, PenTool, Type, FileText } from 'lucide-react';
import confetti from 'canvas-confetti';

interface DreamFormProps {
  initialData?: Dream | null;
  onSubmit: (data: Omit<Dream, 'id' | 'createdAt' | 'updatedAt'>) => void;
  onCancel?: () => void;
  isModal?: boolean;
}

export const DreamForm: React.FC<DreamFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
  isModal = false,
}) => {
  const [title, setTitle] = useState(initialData?.title || '');
  const [content, setContent] = useState(initialData?.content || '');
  const [date, setDate] = useState(initialData?.date || getTodayInputDate());
  const [mood, setMood] = useState<Mood>(initialData?.mood || 'happy');
  const [tags, setTags] = useState<string[]>(initialData?.tags || []);
  const [isLucid, setIsLucid] = useState(initialData?.isLucid || false);
  const [errors, setErrors] = useState<{ title?: string; content?: string }>({});

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setContent(initialData.content);
      setDate(initialData.date);
      setMood(initialData.mood);
      setTags(initialData.tags);
      setIsLucid(initialData.isLucid);
    }
  }, [initialData]);

  const validate = () => {
    const newErrors: { title?: string; content?: string } = {};
    if (!title.trim()) {
      newErrors.title = 'Lütfen rüyanıza bir başlık verin.';
    }
    if (!content.trim()) {
      newErrors.content = 'Lütfen rüyanızın içeriğini yazın.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    onSubmit({
      title: title.trim(),
      content: content.trim(),
      date,
      mood,
      tags,
      isLucid,
    });

    // Başarılı kayıtta tatlı bir confetti efekti
    try {
      confetti({
        particleCount: 30,
        spread: 50,
        origin: { y: 0.6 },
        colors: ['#6366f1', '#8b5cf6', '#10b981', '#f59e0b'],
      });
    } catch {
      // sessizce geç
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      {/* 1. Başlık & Tarih */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="sm:col-span-2">
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <Type size={14} className="text-violet-500" />
            <span>Rüya Başlığı</span>
            <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            value={title}
            onChange={e => {
              setTitle(e.target.value);
              if (errors.title) setErrors({ ...errors, title: undefined });
            }}
            placeholder="Örn: Bulutların Üzerinde Süzülme..."
            className={`w-full px-4 py-2.5 rounded-xl text-sm bg-white dark:bg-slate-900 border ${
              errors.title
                ? 'border-rose-500 focus:ring-rose-500'
                : 'border-slate-300 dark:border-slate-700 focus:ring-violet-500'
            } text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 transition-all`}
          />
          {errors.title && (
            <p className="mt-1.5 text-xs text-rose-500">{errors.title}</p>
          )}
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <Calendar size={14} className="text-violet-500" />
            <span>Rüya Tarihi</span>
          </label>
          <input
            type="date"
            value={date}
            onChange={e => setDate(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl text-sm bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-violet-500 transition-all"
          />
        </div>
      </div>

      {/* 2. Ruh Hali Seçimi */}
      <div>
        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2.5">
          Bu rüya sana ne hissettirdi?
        </label>
        <MoodPicker selectedMood={mood} onSelectMood={setMood} />
      </div>

      {/* 3. Lucid Rüya Toggle */}
      <div className="flex items-center justify-between p-4 rounded-2xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200/80 dark:border-amber-900/50">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300">
            <Sparkles size={18} />
          </div>
          <div>
            <span className="text-sm font-bold text-slate-900 dark:text-slate-100 block">
              Bilinçli Rüya mıydı?
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              Rüya gördüğünün farkında mıydın ve olayları kontrol edebildin mi?
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setIsLucid(!isLucid)}
          className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
            isLucid ? 'bg-amber-500' : 'bg-slate-300 dark:bg-slate-700'
          }`}
        >
          <span
            className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
              isLucid ? 'translate-x-5' : 'translate-x-0'
            }`}
          />
        </button>
      </div>

      {/* 4. Etiketler (Temalar & Semboller) */}
      <div>
        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
          Temalar, Semboller & Etiketler
        </label>
        <TagInput tags={tags} onChange={setTags} />
      </div>

      {/* 5. Rüya İçeriği */}
      <div>
        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
          <FileText size={14} className="text-violet-500" />
          <span>Rüyanın Detayları</span>
          <span className="text-rose-500">*</span>
        </label>
        <textarea
          rows={isModal ? 5 : 7}
          value={content}
          onChange={e => {
            setContent(e.target.value);
            if (errors.content) setErrors({ ...errors, content: undefined });
          }}
          placeholder="Neredeydin? Kimler vardı? Neler yaşandı? Aklında kalan en canlı his veya görüntü neydi..."
          className={`w-full px-4 py-3 rounded-2xl text-sm bg-white dark:bg-slate-900 border ${
            errors.content
              ? 'border-rose-500 focus:ring-rose-500'
              : 'border-slate-300 dark:border-slate-700 focus:ring-violet-500'
          } text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 transition-all leading-relaxed`}
        />
        {errors.content && (
          <p className="mt-1.5 text-xs text-rose-500">{errors.content}</p>
        )}
      </div>

      {/* Aksiyon Butonları */}
      <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
        {onCancel && (
          <Button type="button" variant="ghost" onClick={onCancel}>
            Vazgeç
          </Button>
        )}
        <Button
          type="submit"
          variant="primary"
          icon={<PenTool size={16} />}
        >
          {initialData ? 'Değişiklikleri Kaydet' : 'Rüyayı Kaydet'}
        </Button>
      </div>
    </form>
  );
};
