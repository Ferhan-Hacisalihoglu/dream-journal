import React from 'react';
import type { Mood } from '../../interfaces/dream';
import { MOOD_LIST } from '../../constants/moods';

interface MoodPickerProps {
  selectedMood: Mood;
  onSelectMood: (mood: Mood) => void;
}

export const MoodPicker: React.FC<MoodPickerProps> = ({
  selectedMood,
  onSelectMood,
}) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2.5">
      {MOOD_LIST.map(item => {
        const isSelected = selectedMood === item.type;
        return (
          <button
            key={item.type}
            type="button"
            onClick={() => onSelectMood(item.type)}
            className={`flex flex-col items-center justify-center p-3 rounded-2xl border transition-all duration-200 cursor-pointer ${
              isSelected
                ? `${item.bgLight} ${item.borderLight} ${item.textLight} ${item.bgDark} ${item.borderDark} ${item.textDark} ring-2 ring-violet-500 shadow-md scale-102 font-bold`
                : 'bg-white dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700'
            }`}
          >
            <span className="text-2xl mb-1.5 transform transition-transform group-hover:scale-110">
              {item.emoji}
            </span>
            <span className="text-xs text-center leading-tight">
              {item.label}
            </span>
          </button>
        );
      })}
    </div>
  );
};
