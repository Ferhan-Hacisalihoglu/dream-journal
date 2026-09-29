import React, { useRef } from 'react';
import { ThemeToggle } from './ThemeToggle';
import { BookOpen, PlusCircle, BarChart3, Image as ImageIcon, Download, Upload, Flame } from 'lucide-react';
import type { Dream } from '../../interfaces/dream';
import { exportDreamsToJson, importDreamsFromJson } from '../../utils/exportImport';

export type TabType = 'journal' | 'new' | 'gallery' | 'stats';

interface HeaderProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  dreamCount: number;
  streakDays: number;
  isDark: boolean;
  onToggleTheme: () => void;
  dreams: Dream[];
  onImportDreams: (imported: Dream[]) => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  dreamCount,
  streakDays,
  isDark,
  onToggleTheme,
  dreams,
  onImportDreams,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleExport = () => {
    if (dreams.length === 0) {
      alert('Dışa aktarılacak rüya kaydı bulunamadı.');
      return;
    }
    exportDreamsToJson(dreams);
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const imported = await importDreamsFromJson(file);
      onImportDreams(imported);
      alert(`${imported.length} adet rüya kaydı başarıyla yüklendi!`);
    } catch (err) {
      alert((err as Error).message);
    } finally {
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
        {/* Sol: Logo */}
        <div
          className="flex items-center gap-2.5 cursor-pointer select-none group"
          onClick={() => setActiveTab('journal')}
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-600 text-white flex items-center justify-center font-extrabold text-sm tracking-tight shadow-md shadow-indigo-500/25 group-hover:scale-105 transition-transform">
            DJ
          </div>
          <span className="font-extrabold text-xl tracking-tight text-slate-900 dark:text-slate-100 flex items-center">
            DreamJournal<span className="text-violet-600 dark:text-violet-400">.</span>
          </span>
        </div>

        {/* Orta: DoodleMind Tarzı Nav-Pills */}
        <nav className="hidden md:flex items-center bg-slate-100 dark:bg-slate-800/80 p-1 rounded-full border border-slate-200/70 dark:border-slate-700/60 shadow-inner">
          <button
            onClick={() => setActiveTab('journal')}
            className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
              activeTab === 'journal'
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            <BookOpen size={16} />
            <span>Rüyalarım</span>
            {dreamCount > 0 && (
              <span className="ml-1 px-1.5 py-0.2 rounded-full text-[11px] font-bold bg-violet-600 text-white leading-tight">
                {dreamCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('new')}
            className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
              activeTab === 'new'
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            <PlusCircle size={16} />
            <span>Yeni Rüya Yaz</span>
          </button>

          <button
            onClick={() => setActiveTab('gallery')}
            className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
              activeTab === 'gallery'
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            <ImageIcon size={16} />
            <span>Rüya Galerisi</span>
          </button>

          <button
            onClick={() => setActiveTab('stats')}
            className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
              activeTab === 'stats'
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            <BarChart3 size={16} />
            <span>İstatistikler</span>
          </button>
        </nav>

        {/* Sağ: Durum Rozeti, Yedekleme ve Tema Butonu */}
        <div className="flex items-center gap-2.5">
          {/* Streak veya Durum Rozeti */}
          <div
            className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 shadow-xs"
            title="Günlük rüya kaydetme serisi"
          >
            {streakDays > 0 ? (
              <>
                <Flame size={15} className="text-amber-500 fill-amber-500 animate-pulse" />
                <span>{streakDays} Günlük Seri</span>
              </>
            ) : (
              <>
                <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]" />
                <span>Günlük Aktif</span>
              </>
            )}
          </div>

          {/* Dışa / İçe Aktar Butonları */}
          <div className="flex items-center gap-1">
            <button
              onClick={handleExport}
              title="Rüyaları JSON olarak dışa aktar"
              className="p-2 rounded-xl text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer transition-colors"
            >
              <Download size={17} />
            </button>
            <button
              onClick={() => fileInputRef.current?.click()}
              title="JSON rüya yedeği yükle"
              className="p-2 rounded-xl text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer transition-colors"
            >
              <Upload size={17} />
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept=".json"
              className="hidden"
            />
          </div>

          {/* Tema Butonu */}
          <ThemeToggle isDark={isDark} onToggle={onToggleTheme} />
        </div>
      </div>

      {/* Mobil Sekmeler */}
      <div className="flex md:hidden border-t border-slate-200/80 dark:border-slate-800 px-2 py-1.5 overflow-x-auto justify-around bg-slate-50/50 dark:bg-slate-900/50">
        <button
          onClick={() => setActiveTab('journal')}
          className={`px-3 py-1 text-xs font-semibold rounded-lg flex items-center gap-1.5 ${
            activeTab === 'journal'
              ? 'bg-violet-600 text-white'
              : 'text-slate-600 dark:text-slate-400'
          }`}
        >
          <BookOpen size={14} />
          <span>Rüyalar</span>
        </button>
        <button
          onClick={() => setActiveTab('new')}
          className={`px-3 py-1 text-xs font-semibold rounded-lg flex items-center gap-1.5 ${
            activeTab === 'new'
              ? 'bg-violet-600 text-white'
              : 'text-slate-600 dark:text-slate-400'
          }`}
        >
          <PlusCircle size={14} />
          <span>Yeni Yaz</span>
        </button>
        <button
          onClick={() => setActiveTab('gallery')}
          className={`px-3 py-1 text-xs font-semibold rounded-lg flex items-center gap-1.5 ${
            activeTab === 'gallery'
              ? 'bg-violet-600 text-white'
              : 'text-slate-600 dark:text-slate-400'
          }`}
        >
          <ImageIcon size={14} />
          <span>Galeri</span>
        </button>
        <button
          onClick={() => setActiveTab('stats')}
          className={`px-3 py-1 text-xs font-semibold rounded-lg flex items-center gap-1.5 ${
            activeTab === 'stats'
              ? 'bg-violet-600 text-white'
              : 'text-slate-600 dark:text-slate-400'
          }`}
        >
          <BarChart3 size={14} />
          <span>Analiz</span>
        </button>
      </div>
    </header>
  );
};
