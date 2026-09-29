import { useState } from 'react';
import { Header } from './components/layout/Header';
import type { TabType } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { HomePage } from './pages/HomePage';
import { NewDreamPage } from './pages/NewDreamPage';
import { GalleryPage } from './pages/GalleryPage';
import { StatsPage } from './pages/StatsPage';
import { DreamDetailModal } from './components/dreams/DreamDetailModal';
import { Modal } from './components/ui/Modal';
import { DreamForm } from './components/dreams/DreamForm';
import { ConfirmDialog } from './components/ui/ConfirmDialog';
import { useDreams } from './hooks/useDreams';
import { useTheme } from './hooks/useTheme';
import { calculateStats } from './utils/stats';
import type { Dream } from './interfaces/dream';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('journal');
  const { isDark, toggleTheme } = useTheme();

  const {
    dreams,
    filteredDreams,
    filters,
    setFilters,
    addDream,
    updateDream,
    deleteDream,
    resetToSampleData,
    setAllDreams,
  } = useDreams();

  // Modallar için State'ler
  const [editingDream, setEditingDream] = useState<Dream | null>(null);
  const [viewingDream, setViewingDream] = useState<Dream | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // İstatistikleri hesapla
  const stats = calculateStats(dreams);

  // Yeni rüya oluşturma işlemi
  const handleCreateDream = (data: Omit<Dream, 'id' | 'createdAt' | 'updatedAt'>) => {
    addDream(data);
    setActiveTab('journal');
  };

  // Düzenleme kaydetme
  const handleUpdateDream = (data: Omit<Dream, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (editingDream) {
      updateDream(editingDream.id, data);
      setEditingDream(null);
    }
  };

  // Rastgele bir rüya seç ve detayını aç
  const handleRandomDream = () => {
    if (dreams.length === 0) return;
    const randomIndex = Math.floor(Math.random() * dreams.length);
    setViewingDream(dreams[randomIndex]);
  };

  // Etiket seçildiğinde ana akışa geçip filtrele
  const handleTagFilterFromAnywhere = (tag: string) => {
    setFilters({ ...filters, tag });
    setActiveTab('journal');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f6f7fb] dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans transition-colors duration-200">
      {/* 1. DoodleMind Tarzı Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        dreamCount={dreams.length}
        streakDays={stats.currentStreakDays}
        isDark={isDark}
        onToggleTheme={toggleTheme}
        dreams={dreams}
        onImportDreams={setAllDreams}
      />

      {/* 2. Ana İçerik Alanı */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeTab === 'journal' && (
          <HomePage
            dreams={dreams}
            filteredDreams={filteredDreams}
            filters={filters}
            setFilters={setFilters}
            stats={stats}
            onNewDream={() => setActiveTab('new')}
            onEditDream={dream => setEditingDream(dream)}
            onDeleteDream={id => setDeletingId(id)}
            onViewDetail={dream => setViewingDream(dream)}
            onRandomDream={handleRandomDream}
            onViewAllStats={() => setActiveTab('stats')}
            onLoadSamples={resetToSampleData}
          />
        )}

        {activeTab === 'new' && (
          <NewDreamPage
            onBack={() => setActiveTab('journal')}
            onSubmit={handleCreateDream}
          />
        )}

        {activeTab === 'gallery' && (
          <GalleryPage
            dreams={dreams}
            onBack={() => setActiveTab('journal')}
            onViewDetail={dream => setViewingDream(dream)}
          />
        )}

        {activeTab === 'stats' && (
          <StatsPage
            stats={stats}
            onBack={() => setActiveTab('journal')}
            onSelectTag={handleTagFilterFromAnywhere}
          />
        )}
      </main>

      {/* 3. Footer */}
      <Footer />

      {/* 4. Rüya Detay Modalı */}
      <DreamDetailModal
        dream={viewingDream}
        isOpen={!!viewingDream}
        onClose={() => setViewingDream(null)}
        onEdit={dream => {
          setViewingDream(null);
          setEditingDream(dream);
        }}
        onDelete={id => {
          setViewingDream(null);
          setDeletingId(id);
        }}
      />

      {/* 5. Rüya Düzenleme Modalı */}
      <Modal
        isOpen={!!editingDream}
        onClose={() => setEditingDream(null)}
        title="Rüyayı Düzenle"
        maxWidth="2xl"
      >
        {editingDream && (
          <DreamForm
            initialData={editingDream}
            onSubmit={handleUpdateDream}
            onCancel={() => setEditingDream(null)}
            isModal={true}
          />
        )}
      </Modal>

      {/* 6. Silme Onay Penceresi */}
      <ConfirmDialog
        isOpen={!!deletingId}
        onClose={() => setDeletingId(null)}
        onConfirm={() => {
          if (deletingId) {
            deleteDream(deletingId);
            setDeletingId(null);
          }
        }}
        title="Rüyayı Silmek İstediğinize Emin misiniz?"
        message="Bu rüya kaydı kalıcı olarak silinecektir. Bu işlem geri alınamaz."
        confirmLabel="Evet, Sil"
        cancelLabel="İptal"
      />
    </div>
  );
}