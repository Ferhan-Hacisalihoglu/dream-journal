import React from 'react';
import type { MoodStat } from '../../utils/stats';
import { MOODS } from '../../constants/moods';

interface MoodDistributionProps {
  distribution: MoodStat[];
}

export const MoodDistribution: React.FC<MoodDistributionProps> = ({ distribution }) => {
  if (distribution.length === 0) {
    return (
      <div className="p-6 text-center text-sm text-slate-400">
        Henüz ruh hali verisi bulunmuyor.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {distribution.map(item => {
        const meta = MOODS[item.mood];
        return (
          <div
            key={item.mood}
            className={`p-4 rounded-2xl border transition-all ${meta.bgLight} ${meta.borderLight} ${meta.bgDark} ${meta.borderDark}`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-2xl">{meta.emoji}</span>
              <span className="text-lg font-black text-slate-800 dark:text-slate-100">
                %{item.percentage}
              </span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-slate-800 dark:text-slate-200">
                {meta.label}
              </span>
              <span className="text-slate-500 dark:text-slate-400 font-medium">
                {item.count} rüya
              </span>
            </div>
            {/* Küçük Bar */}
            <div className="h-1.5 w-full bg-black/5 dark:bg-white/10 rounded-full overflow-hidden mt-2.5">
              <div
                className={`h-full rounded-full ${meta.barColor}`}
                style={{ width: `${item.percentage}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};
