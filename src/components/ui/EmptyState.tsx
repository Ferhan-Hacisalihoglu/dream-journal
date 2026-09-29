import React from 'react';
import { Moon, Sparkles } from 'lucide-react';
import { Button } from './Button';

interface EmptyStateProps {
  title?: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  secondaryLabel?: string;
  onSecondaryAction?: () => void;
  icon?: React.ReactNode;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title = 'Henüz Rüya Kaydedilmedi',
  description = 'Gördüğün rüyaları unutmadan buraya kaydet, temalarını ve duygularını analiz etmeye başla.',
  actionLabel,
  onAction,
  secondaryLabel,
  onSecondaryAction,
  icon,
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-3xl bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm">
      <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-indigo-100 to-violet-100 dark:from-indigo-950/60 dark:to-violet-950/60 text-indigo-600 dark:text-violet-400 flex items-center justify-center mb-5 shadow-inner">
        {icon || <Moon size={32} strokeWidth={1.75} />}
      </div>
      <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-2">
        {title}
      </h3>
      <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm mb-6 leading-relaxed">
        {description}
      </p>
      <div className="flex items-center gap-3 flex-wrap justify-center">
        {secondaryLabel && onSecondaryAction && (
          <Button variant="outline" size="sm" onClick={onSecondaryAction}>
            {secondaryLabel}
          </Button>
        )}
        {actionLabel && onAction && (
          <Button
            variant="primary"
            size="sm"
            icon={<Sparkles size={16} />}
            onClick={onAction}
          >
            {actionLabel}
          </Button>
        )}
      </div>
    </div>
  );
};
