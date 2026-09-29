import React from 'react';
import type { Dream } from '../../interfaces/dream';
import { DreamCard } from './DreamCard';
import { EmptyState } from '../ui/EmptyState';

interface DreamListProps {
  dreams: Dream[];
  totalCount: number;
  onEdit: (dream: Dream) => void;
  onDelete: (id: string) => void;
  onSelectTag?: (tag: string) => void;
  onViewDetail?: (dream: Dream) => void;
  onNewDream: () => void;
  onLoadSamples?: () => void;
}

export const DreamList: React.FC<DreamListProps> = ({
  dreams,
  totalCount,
  onEdit,
  onDelete,
  onSelectTag,
  onViewDetail,
  onNewDream,
  onLoadSamples,
}) => {
  if (totalCount === 0) {
    return (
      <EmptyState
        title="Henüz Kaydedilmiş Rüya Yok"
        description="Gecenin gizemini kaydetmeye hazır mısın? İlk rüyanı ekleyebilir veya örnek rüyaları yükleyerek başlayabilirsin."
        actionLabel="İlk Rüyayı Yaz"
        onAction={onNewDream}
        secondaryLabel="Örnek Rüyaları Yükle"
        onSecondaryAction={onLoadSamples}
      />
    );
  }

  if (dreams.length === 0) {
    return (
      <EmptyState
        title="Eşleşen Rüya Bulunamadı"
        description="Arama kriterlerine uygun rüya kaydı bulunamadı. Filtreleri temizlemeyi veya farklı bir arama terimi denemeyi deneyebilirsin."
        actionLabel="Yeni Rüya Yaz"
        onAction={onNewDream}
      />
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {dreams.map(dream => (
        <DreamCard
          key={dream.id}
          dream={dream}
          onEdit={onEdit}
          onDelete={onDelete}
          onSelectTag={onSelectTag}
          onViewDetail={onViewDetail}
        />
      ))}
    </div>
  );
};
