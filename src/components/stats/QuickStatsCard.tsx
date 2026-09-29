import React from 'react';
import type { OverallStats } from '../../utils/stats';
import { MOODS } from '../../constants/moods';
import { Dice5, Flame, Award } from 'lucide-react';
import { Button } from '../ui/Button';

interface QuickStatsCardProps {
  stats: OverallStats;
  onRandomDream: () => void;
  onViewAllStats: () => void;
  hasDreams: boolean;
}

export const QuickStatsCard: React.FC<QuickStatsCardProps> = ({
  stats,
  onRandomDream,
  onViewAllStats,
  hasDreams,
}) => {
  return (
    <div className="flex flex-col gap-4 p-5 sm:p-6 bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl shadow-xs transition-colors sticky top-24">
      {/* Kart Başlığı */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-violet-100 dark:bg-violet-950/60 text-violet-600 dark:text-violet-400 flex items-center justify-center">
            <Award size={18} />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
              Rüya Analizi
            </h3>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Bilinçaltı Özeti
            </p>
          </div>
        </div>

        {stats.currentStreakDays > 0 && (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
            <Flame size={13} className="text-amber-500 fill-amber-400" />
            <span>{stats.currentStreakDays} Gün</span>
          </span>
        )}
      </div>

      {/* Mini İstatistik Sayı Kutuları */}
      <div className="grid grid-cols-2 gap-2.5">
        <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
          <span className="text-[11px] font-medium text-slate-400 dark:text-slate-500 block">
            Toplam Kayıt
          </span>
          <span className="text-2xl font-black text-slate-900 dark:text-white">
            {stats.totalDreams}
          </span>
        </div>

        <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
          <span className="text-[11px] font-medium text-slate-400 dark:text-slate-500 block">
            Bilinçli Oranı
          </span>
          <span className="text-2xl font-black text-violet-600 dark:text-violet-400">
            %{stats.lucidPercentage}
          </span>
        </div>

        <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
          <span className="text-[11px] font-medium text-slate-400 dark:text-slate-500 block">
            Bu Ayki Rüyalar
          </span>
          <span className="text-2xl font-black text-emerald-600 dark:text-emerald-400">
            {stats.thisMonthCount}
          </span>
        </div>

        <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
          <span className="text-[11px] font-medium text-slate-400 dark:text-slate-500 block">
            Farklı Tema
          </span>
          <span className="text-2xl font-black text-indigo-600 dark:text-indigo-400">
            {stats.topTags.length}
          </span>
        </div>
      </div>

      {/* Ruh Hali Dağılım Çubukları (Tailwind Bar) */}
      {stats.moodDistribution.length > 0 && (
        <div className="flex flex-col gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
          <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
            Duygu Durum Dağılımı
          </span>
          <div className="flex flex-col gap-1.5">
            {stats.moodDistribution.slice(0, 4).map(item => {
              const meta = MOODS[item.mood];
              return (
                <div key={item.mood} className="flex flex-col gap-1 text-xs">
                  <div className="flex justify-between items-center text-slate-600 dark:text-slate-400">
                    <span className="flex items-center gap-1.5 font-medium">
                      <span>{meta.emoji}</span>
                      <span>{meta.label.split(' ')[0]}</span>
                    </span>
                    <span className="font-bold text-slate-800 dark:text-slate-200">
                      %{item.percentage} ({item.count})
                    </span>
                  </div>
                  {/* Tailwind Bar */}
                  <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${meta.barColor} transition-all duration-500`}
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* DoodleMind Rastgele Butonu */}
      <div className="flex flex-col gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
        <Button
          variant="outline"
          size="sm"
          icon={<Dice5 size={16} />}
          onClick={onRandomDream}
          disabled={!hasDreams}
          className="w-full text-xs font-semibold"
        >
          Rastgele Bir Rüya Oku
        </Button>
        <button
          onClick={onViewAllStats}
          className="text-xs text-center text-violet-600 dark:text-violet-400 hover:underline font-semibold cursor-pointer py-1"
        >
          Tüm İstatistikleri Görüntüle →
        </button>
      </div>
    </div>
  );
};
