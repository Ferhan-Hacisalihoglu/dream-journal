import React from 'react';
import { DreamForm } from '../components/dreams/DreamForm';
import type { Dream } from '../interfaces/dream';
import { ArrowLeft, Sparkles } from 'lucide-react';
import { Button } from '../components/ui/Button';

interface NewDreamPageProps {
  onBack: () => void;
  onSubmit: (data: Omit<Dream, 'id' | 'createdAt' | 'updatedAt'>) => void;
}

export const NewDreamPage: React.FC<NewDreamPageProps> = ({ onBack, onSubmit }) => {
  return (
    <div className="max-w-3xl mx-auto py-4 sm:py-6 animate-in fade-in duration-200">
      {/* Üst Başlık & Geri Dön Butonu */}
      <div className="flex items-center justify-between mb-6">
        <Button
          variant="ghost"
          size="sm"
          icon={<ArrowLeft size={16} />}
          onClick={onBack}
        >
          Geri Dön
        </Button>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-violet-50 text-violet-700 dark:bg-violet-950/60 dark:text-violet-300 border border-violet-200/60 dark:border-violet-800">
          <Sparkles size={13} />
          <span>Yeni Deneyim Kaydı</span>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm">
        <div className="mb-6 pb-4 border-b border-slate-100 dark:border-slate-800">
          <h2 className="text-2xl font-black text-slate-900 dark:text-slate-100 tracking-tight">
            Yeni Bir Rüya Yaz
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Gördüğün rüyanın detaylarını, sana hissettirdiklerini ve anahtar sembolleri buraya aktar.
          </p>
        </div>

        <DreamForm
          onSubmit={onSubmit}
          onCancel={onBack}
        />
      </div>
    </div>
  );
};
