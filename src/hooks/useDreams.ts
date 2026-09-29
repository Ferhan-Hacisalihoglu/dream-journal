import { useMemo, useState, useEffect } from 'react';
import type { Dream, DreamFilters } from '../interfaces/dream';
import { SAMPLE_DREAMS } from '../constants/sampleDreams';
import { useLocalStorage } from './useLocalStorage';

export function useDreams() {
  const [dreams, setDreams] = useLocalStorage<Dream[]>('dreams_data', SAMPLE_DREAMS);
  const [filters, setFilters] = useState<DreamFilters>({
    search: '',
    tag: null,
    mood: null,
    onlyLucid: false,
    sort: 'newest',
  });

  // Yeni eklenen örnek rüyaları mevcut yerel veriye senkronize et
  useEffect(() => {
    setDreams(prev => {
      const hasSample5 = prev.some(d => d.id === 'sample-5');
      if (!hasSample5) {
        const sample5 = SAMPLE_DREAMS.find(d => d.id === 'sample-5');
        if (sample5) {
          return [...prev, sample5];
        }
      }
      return prev;
    });
  }, [setDreams]);

  // Yeni Rüya Ekle
  const addDream = (data: Omit<Dream, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newDream: Dream = {
      ...data,
      id: crypto.randomUUID(),
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    setDreams(prev => [newDream, ...prev]);
    return newDream;
  };

  // Rüya Güncelle
  const updateDream = (id: string, patch: Partial<Omit<Dream, 'id' | 'createdAt'>>) => {
    setDreams(prev =>
      prev.map(item =>
        item.id === id ? { ...item, ...patch, updatedAt: Date.now() } : item
      )
    );
  };

  // Rüya Sil
  const deleteDream = (id: string) => {
    setDreams(prev => prev.filter(item => item.id !== id));
  };

  // Demo verileri sıfırla / yükle
  const resetToSampleData = () => {
    setDreams(SAMPLE_DREAMS);
  };

  // Tüm rüyaları temizle
  const clearAllDreams = () => {
    setDreams([]);
  };

  // Dışarıdan içe aktarma
  const setAllDreams = (newDreams: Dream[]) => {
    setDreams(newDreams);
  };

  // Filtrelenmiş ve Sıralanmış Liste
  const filteredDreams = useMemo(() => {
    return dreams
      .filter(dream => {
        // Metin arama (başlık, içerik, etiketler)
        if (filters.search.trim()) {
          const q = filters.search.toLowerCase();
          const matchTitle = dream.title.toLowerCase().includes(q);
          const matchContent = dream.content.toLowerCase().includes(q);
          const matchTag = dream.tags.some(t => t.toLowerCase().includes(q));
          if (!matchTitle && !matchContent && !matchTag) return false;
        }

        // Etiket filtresi
        if (filters.tag && !dream.tags.map(t => t.toLowerCase()).includes(filters.tag.toLowerCase())) {
          return false;
        }

        // Ruh hali filtresi
        if (filters.mood && dream.mood !== filters.mood) {
          return false;
        }

        // Yalnızca Lucid rüyalar
        if (filters.onlyLucid && !dream.isLucid) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (filters.sort === 'newest') {
          return (b.createdAt || 0) - (a.createdAt || 0);
        } else {
          return (a.createdAt || 0) - (b.createdAt || 0);
        }
      });
  }, [dreams, filters]);

  return {
    dreams,
    filteredDreams,
    filters,
    setFilters,
    addDream,
    updateDream,
    deleteDream,
    resetToSampleData,
    clearAllDreams,
    setAllDreams,
  };
}
