import React from 'react';
import { Sparkles, PenTool } from 'lucide-react';
import { Button } from '../ui/Button';

interface HeroSectionProps {
  onNewDream: () => void;
  onLoadSamples?: () => void;
  totalDreams: number;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onNewDream,
  onLoadSamples,
  totalDreams,
}) => {
  return (
    <section className="relative pt-6 pb-4 sm:pt-10 sm:pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-200/60 dark:border-slate-800/80">
      <div className="max-w-2xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-violet-50 text-violet-700 dark:bg-violet-950/50 dark:text-violet-300 border border-violet-200/60 dark:border-violet-800/60 mb-3.5">
          <Sparkles size={13} className="text-violet-500" />
          <span>Bilinçaltının Dijital Arşivi</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.15]">
          Gecenin fısıltılarını <br className="hidden sm:inline" />
          <span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 bg-clip-text text-transparent">
            unutmadan kaydet.
          </span>
        </h1>
        <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-400 font-normal leading-relaxed">
          Rüyalarını hatırla, ruh halini takip et ve temaların ardındaki gizli hikayeyi keşfet.
        </p>
      </div>

      <div className="flex flex-col items-start md:items-end gap-3 shrink-0">
        {/* DoodleMind Tarzı Handwritten Note */}
        <div className="hidden sm:flex items-center gap-2 text-violet-600 dark:text-violet-400 font-medium text-xs sm:text-sm italic transform -rotate-1 select-none">
          <span className="bg-violet-100/70 dark:bg-violet-950/80 px-2.5 py-1 rounded-lg border border-violet-200/50 dark:border-violet-800/50">
            ✍️ Her sembol bir ipucudur
          </span>
          <span className="text-lg">💭</span>
        </div>

        <div className="flex items-center gap-2.5 w-full sm:w-auto">
          {totalDreams === 0 && onLoadSamples && (
            <Button
              variant="outline"
              size="md"
              onClick={onLoadSamples}
              className="flex-1 sm:flex-initial text-xs sm:text-sm"
            >
              Demo Verileri Yükle
            </Button>
          )}
          <Button
            variant="primary"
            size="md"
            icon={<PenTool size={16} />}
            onClick={onNewDream}
            className="flex-1 sm:flex-initial"
          >
            Rüya Ekle
          </Button>
        </div>
      </div>
    </section>
  );
};
