import React from 'react';
import type { OverallStats } from '../utils/stats';
import { TopTagsChart } from '../components/stats/TopTagsChart';
import { MoodDistribution } from '../components/stats/MoodDistribution';
import { Button } from '../components/ui/Button';
import { ArrowLeft, Sparkles, Flame, Moon, BookOpen, Compass, Lightbulb } from 'lucide-react';

interface StatsPageProps {
  stats: OverallStats;
  onBack: () => void;
  onSelectTag?: (tag: string) => void;
}

export const StatsPage: React.FC<StatsPageProps> = ({
  stats,
  onBack,
  onSelectTag,
}) => {
  return (
    <div className="flex flex-col gap-6 py-4 animate-in fade-in duration-200">
      {/* Üst Başlık & Geri Dön Butonu */}
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
            Rüya & Bilinçaltı Analitiği
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Zihninizin gece örüntülerini, en sık tekrar eden sembolleri ve duygusal frekansları keşfedin.
          </p>
        </div>

        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-violet-50 text-violet-700 dark:bg-violet-950/60 dark:text-violet-300 border border-violet-200/60 dark:border-violet-800 self-start sm:self-auto">
          <Moon size={14} className="text-violet-500" />
          <span>Toplam {stats.totalDreams} Rüya Kaydı Analiz Edildi</span>
        </div>
      </div>

      {/* Büyük Özet Kartları */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-2">
            <span className="text-xs font-semibold">Toplam Rüya</span>
            <BookOpen size={16} className="text-violet-500" />
          </div>
          <span className="text-3xl font-black text-slate-900 dark:text-white">
            {stats.totalDreams}
          </span>
          <span className="text-[11px] text-slate-400 block mt-1">
            Kayıt altına alınan rüyalar
          </span>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-2">
            <span className="text-xs font-semibold">Bilinçli Rüya Oranı</span>
            <Sparkles size={16} className="text-amber-500" />
          </div>
          <span className="text-3xl font-black text-amber-500">
            %{stats.lucidPercentage}
          </span>
          <span className="text-[11px] text-slate-400 block mt-1">
            {stats.lucidDreams} bilinçli deneyim
          </span>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-2">
            <span className="text-xs font-semibold">Rüya Serisi</span>
            <Flame size={16} className="text-rose-500 fill-rose-500" />
          </div>
          <span className="text-3xl font-black text-rose-500">
            {stats.currentStreakDays} Gün
          </span>
          <span className="text-[11px] text-slate-400 block mt-1">
            Ardışık kayıt tutma serisi
          </span>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-2">
            <span className="text-xs font-semibold">Bu Ay Kaydedilen</span>
            <Compass size={16} className="text-emerald-500" />
          </div>
          <span className="text-3xl font-black text-emerald-500">
            {stats.thisMonthCount}
          </span>
          <span className="text-[11px] text-slate-400 block mt-1">
            Son 30 günün akışı
          </span>
        </div>
      </div>

      {/* İki Kolonlu Detaylı Grafikler */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sol: Sık Görülen Temalar */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                En Sık Görülen Temalar & Semboller
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Rüyalarınızda en çok yer bulan kavramlar
              </p>
            </div>
            <span className="text-xs font-bold text-violet-600 dark:text-violet-400">
              İlk 10
            </span>
          </div>

          <TopTagsChart tags={stats.topTags} onSelectTag={onSelectTag} />
        </div>

        {/* Sağ: Duygu Durum Dağılımı */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs">
          <div className="mb-5">
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
              Ruh Hali Dağılımı
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Rüyalarınızın hissettirdiği duygusal harita
            </p>
          </div>

          <MoodDistribution distribution={stats.moodDistribution} />
        </div>
      </div>

      {/* İpucu ve Bilgi Kartı */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-violet-50 to-indigo-50 dark:from-slate-900 dark:to-violet-950/30 border border-violet-200/60 dark:border-violet-900/40 flex items-start gap-4">
        <div className="p-2.5 rounded-2xl bg-white dark:bg-slate-800 text-violet-600 dark:text-violet-400 shadow-xs shrink-0">
          <Lightbulb size={22} />
        </div>
        <div>
          <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">
            Rüya Günlüğü Tutmanın Faydaları
          </h4>
          <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
            Uyandıktan sonraki ilk 10 dakika içinde rüyalarınızı kaydetmek, rüya hatırlama kabiliyetinizi ve bilinçli rüya görme sıklığınızı belirgin şekilde artırır. Tekrarlayan semboller, günlük yaşamınızdaki bastırılmış duygular veya çözülmemiş düşünceler hakkında önemli ipuçları taşır.
          </p>
        </div>
      </div>
    </div>
  );
};
