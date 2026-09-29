import React from 'react';
import type { TagStat } from '../../utils/stats';
import { Hash } from 'lucide-react';

interface TopTagsChartProps {
  tags: TagStat[];
  onSelectTag?: (tag: string) => void;
}

export const TopTagsChart: React.FC<TopTagsChartProps> = ({ tags, onSelectTag }) => {
  if (tags.length === 0) {
    return (
      <div className="p-6 text-center text-sm text-slate-400">
        Henüz etiketlenmiş rüya verisi bulunmuyor.
      </div>
    );
  }

  const maxCount = Math.max(...tags.map(t => t.count), 1);

  return (
    <div className="flex flex-col gap-3">
      {tags.map(item => {
        const widthPct = Math.round((item.count / maxCount) * 100);
        return (
          <div
            key={item.tag}
            onClick={() => onSelectTag && onSelectTag(item.tag)}
            className="group flex flex-col gap-1 cursor-pointer"
          >
            <div className="flex justify-between items-center text-xs">
              <span className="font-semibold text-slate-700 dark:text-slate-200 group-hover:text-violet-600 dark:group-hover:text-violet-400 flex items-center gap-1 transition-colors">
                <Hash size={13} className="text-violet-400" />
                <span>{item.tag}</span>
              </span>
              <span className="text-slate-500 dark:text-slate-400 font-medium">
                {item.count} kez (%{item.percentage})
              </span>
            </div>
            <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 group-hover:from-indigo-400 group-hover:to-violet-400 transition-all duration-500"
                style={{ width: `${widthPct}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};
