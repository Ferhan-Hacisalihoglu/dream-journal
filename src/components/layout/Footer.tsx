import React from 'react';
import { Moon } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-auto border-t border-slate-200/80 dark:border-slate-800 py-6 bg-white/50 dark:bg-slate-900/50 text-slate-500 dark:text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        <div className="flex items-center gap-2">
          <Moon size={16} className="text-violet-500" />
          <span className="font-semibold text-slate-800 dark:text-slate-200">
            DreamJournal
          </span>
          <span>— Rüya Günlüğü & Bilinçaltı Analiz Sistemi</span>
        </div>
        <div className="text-slate-400 dark:text-slate-500 text-[11px]">
          Tüm rüya kayıtlarınız yalnızca cihazınızda güvenle saklanır.
        </div>
      </div>
    </footer>
  );
};
