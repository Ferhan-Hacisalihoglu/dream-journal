import React from 'react';
import { HeroSection } from '../components/layout/HeroSection';
import { FilterBar } from '../components/dreams/FilterBar';
import { DreamList } from '../components/dreams/DreamList';
import { ThemesBar } from '../components/dreams/ThemesBar';
import { QuickStatsCard } from '../components/stats/QuickStatsCard';
import type { Dream, DreamFilters } from '../interfaces/dream';
import type { OverallStats } from '../utils/stats';

interface HomePageProps {
  dreams: Dream[];
  filteredDreams: Dream[];
  filters: DreamFilters;
  setFilters: (filters: DreamFilters) => void;
  stats: OverallStats;
  onNewDream: () => void;
  onEditDream: (dream: Dream) => void;
  onDeleteDream: (id: string) => void;
  onViewDetail: (dream: Dream) => void;
  onRandomDream: () => void;
  onViewAllStats: () => void;
  onLoadSamples: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  dreams,
  filteredDreams,
  filters,
  setFilters,
  stats,
  onNewDream,
  onEditDream,
  onDeleteDream,
  onViewDetail,
  onRandomDream,
  onViewAllStats,
  onLoadSamples,
}) => {
  const handleSelectTag = (tag: string | null) => {
    setFilters({ ...filters, tag });
  };

  return (
    <div className="flex flex-col gap-6 sm:gap-8 animate-in fade-in duration-300">
      {/* 1. Hero Karşılama Bölümü */}
      <HeroSection
        onNewDream={onNewDream}
        onLoadSamples={onLoadSamples}
        totalDreams={dreams.length}
      />

      {/* 2. İki Kolonlu Çalışma Masası (Workbench Grid) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
        {/* Sol Kolon (8/12): Filtreleme ve Rüya Akışı */}
        <div className="lg:col-span-8 flex flex-col gap-5">
          <FilterBar
            filters={filters}
            onChangeFilters={setFilters}
            availableTags={stats.topTags.map(t => t.tag)}
          />

          <DreamList
            dreams={filteredDreams}
            totalCount={dreams.length}
            onEdit={onEditDream}
            onDelete={onDeleteDream}
            onSelectTag={handleSelectTag}
            onViewDetail={onViewDetail}
            onNewDream={onNewDream}
            onLoadSamples={onLoadSamples}
          />
        </div>

        {/* Sağ Kolon (4/12): Hızlı Özet & Analiz Paneli */}
        <aside className="lg:col-span-4">
          <QuickStatsCard
            stats={stats}
            onRandomDream={onRandomDream}
            onViewAllStats={onViewAllStats}
            hasDreams={dreams.length > 0}
          />
        </aside>
      </div>

      {/* 3. Alt Popüler Temalar & Semboller Çubuğu (DoodleMind SamplesBar karşılığı) */}
      <ThemesBar
        topTags={stats.topTags}
        activeTag={filters.tag}
        onSelectTag={handleSelectTag}
      />
    </div>
  );
};
