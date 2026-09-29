# DreamJournal. — Rüya Günlüğü & Bilinçaltı Analiz Sistemi

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5%2B-3178C6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-6%2B-646CFF?logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-06B6D4?logo=tailwindcss&logoColor=white)
![Lucide React](https://img.shields.io/badge/Icons-Lucide_React-F56565?logo=feather&logoColor=white)

> Kullanıcıların gördükleri rüyaları unutmadan kayıt altına alabildiği, bilinçaltı sembollerini etiketleyip frekans analizi yapabildiği, duygu durum (mood) dağılımlarını ve ardışık rüya serilerini (streak) takip edebildiği modern, istemci taraflı (client-side) bir web uygulamasıdır.

Arayüz mimarisi, [DoodleMind](https://github.com/Ferhan-Hacisalihoglu/DoodleMind) projesinin çift kolonlu çalışma masası (workbench), üst hap (pill) navigasyon sistemi ve anlık filtreleme estetiğinden esinlenilerek tasarlanmıştır.

---

## 🏗️ 1. Mimari ve Teknik Altyapı

Uygulama, harici bir veritabanı sunucusu bağımlılığı olmadan **Offline-First (Önce Çevrimdışı)** prensibiyle çalışacak şekilde mimarilendirilmiştir.

```
┌────────────────────────────────────────────────────────────────────────┐
│                          DREAMJOURNAL CLIENT                           │
├────────────────────────────────────────────────────────────────────────┤
│  [ UI Layer ]                                                          │
│  React 19 Components + Tailwind CSS v4 + Lucide Icons                  │
│  (Header, HeroSection, Workbench Grid, DreamCard, QuickStatsCard)       │
├────────────────────────────────────────────────────────────────────────┤
│  [ State & Hook Katmanı ]                                              │
│  useDreams (CRUD, Filter & Search Memoization)                         │
│  useLocalStorage (JSON Serialization & Deserialization)                │
│  useTheme (HTML .dark Class Toggling & Persistence)                    │
├────────────────────────────────────────────────────────────────────────┤
│  [ Utility & Hesaplama Motoru ]                                        │
│  date.ts (Moment.js Turkish Relative & Calendar Timing)                │
│  stats.ts (Tag Frequency Sorting, Streak Calculation Algorithm)        │
│  exportImport.ts (Atomic Blob Download & File API Reading)             │
├────────────────────────────────────────────────────────────────────────┤
│  [ Depolama Katmanı ]                                                  │
│  window.localStorage ('dreams_data', 'dream_theme')                    │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 📁 2. Detaylı Dosya ve Dizin Mimarisi

```
c:/Project/Other/dream-journal/
├── public/
│   ├── _redirects                  # Netlify SPA yönlendirme kuralı (/* /index.html 200)
│   └── favicon.svg                 # Vektörel hilal ve yıldız degrade uygulama ikonu
├── src/
│   ├── components/
│   │   ├── dreams/
│   │   │   ├── DreamCard.tsx       # Moment.js göreceli zamanlı, mood ve etiketli kart
│   │   │   ├── DreamDetailModal.tsx# Rüyanın tam içeriğini gösteren detay penceresi
│   │   │   ├── DreamForm.tsx       # Doğrulama (validation) içeren ekleme/düzenleme formu
│   │   │   ├── DreamList.tsx       # Kart ızgarası ve dinamik boş durum yöneticisi
│   │   │   ├── FilterBar.tsx       # Canlı metin araması, mood çipleri ve sıralama
│   │   │   ├── MoodPicker.tsx      # 6 farklı duygu durumunu sunan seçim matrisi
│   │   │   ├── TagInput.tsx        # Enter/virgül tetiklemeli, silinebilir etiket bileşeni
│   │   │   └── ThemesBar.tsx       # Yatay kaydırılabilir sık görülen semboller çubuğu
│   │   ├── layout/
│   │   │   ├── Footer.tsx          # Minimalist alt bilgi alanı
│   │   │   ├── Header.tsx          # DoodleMind tarzı Nav-Pill ve sayaç rozetli üst çubuk
│   │   │   ├── HeroSection.tsx     # Karşılama başlığı ve ilham veren el yazısı notu
│   │   │   └── ThemeToggle.tsx     # Karanlık/Aydınlık mod geçiş anahtarı
│   │   ├── stats/
│   │   │   ├── MoodDistribution.tsx# Ruh hali yüzdeleri ve orantılı renk çubukları
│   │   │   ├── QuickStatsCard.tsx  # Sağ kolondaki anlık özet ve rastgele rüya kartı
│   │   │   └── TopTagsChart.tsx    # En popüler 10 sembolü gösteren Tailwind bar grafiği
│   │   └── ui/
│   │       ├── Button.tsx          # Variant (primary, ghost, danger) destekli buton
│   │       ├── ConfirmDialog.tsx   # Yanlışlıkla silmeyi engelleyen güvenlik modalı
│   │       ├── EmptyState.tsx      # Arama veya liste boşken gösterilen rehber ekranı
│   │       └── Modal.tsx           # Backdrop blur ve ESC tuşu dinleyicili genel modal
│   ├── constants/
│   │   ├── moods.ts                # Duyguların emojileri, Tailwind renk kodları ve adları
│   │   └── sampleDreams.ts         # İlk açılışta yüklenen 6 adet zengin demo rüya kaydı
│   ├── hooks/
│   │   ├── useDreams.ts            # CRUD operasyonları, arama ve useMemo filtreleme
│   │   ├── useLocalStorage.ts      # Tip güvenli (generic) kalıcı depolama hook'u
│   │   └── useTheme.ts             # HTML köküne .dark sınıfını işleyen tema hook'u
│   ├── interfaces/
│   │   └── dream.ts                # Dream, Mood, DreamFilters ve Stats TypeScript tipleri
│   ├── pages/
│   │   ├── GalleryPage.tsx         # Görsel ve Bilinçli rüyalar odaklı koleksiyon sayfası
│   │   ├── HomePage.tsx            # 2 kolonlu ana çalışma masası (Workbench)
│   │   ├── NewDreamPage.tsx        # Odaklanmış yeni rüya yazma çalışma alanı
│   │   └── StatsPage.tsx           # Kapsamlı analitik, grafikler ve rüya serisi sayfası
│   ├── utils/
│   │   ├── date.ts                 # Moment.js Türkçe takvim ve göreceli zaman fonksiyonları
│   │   ├── exportImport.ts         # JSON dosya dışa aktarma (Blob) ve içe aktarma (FileReader)
│   │   └── stats.ts                # Etiket frekansı, streak ve yüzdelik dağılım motoru
│   ├── App.css                     # Tailwind v4 `@custom-variant dark` ve scrollbar stilleri
│   ├── App.tsx                     # Sekme navigasyonu, global modal durumları ve layout
│   ├── index.css                   # Global Tailwind v4 importları ve yumuşak kaydırma
│   └── main.tsx                    # React 19 Root başlatma noktası
├── eslint.config.js                # Kod kalitesi ve lint kuralları
├── index.html                      # HTML5 kabuğu, Plus Jakarta Sans fontu ve meta tag'ler
├── package.json                    # Bağımlılıklar, scriptler ve motor versiyonları
├── tsconfig.app.json               # Vite ve React için sıkı TypeScript derleyici ayarları
└── vite.config.ts                  # Vite + React + Tailwind CSS v4 eklenti yapılandırması
```

---

## ⚙️ 3. Çekirdek Teknik Mekanizmalar

### 3.1. Tip Güvenli ve Reaktif LocalStorage Senkronizasyonu (`useLocalStorage.ts`)
Veriler `JSON.parse` ve `JSON.stringify` işlemlerinden geçerken hata kontrolüyle korunur:

```typescript
export function useLocalStorage<T>(key: string, initialValue: T): [T, (val: T | ((prev: T) => T)) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (err) {
      console.warn('LocalStorage yazma hatası:', err);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}
```

### 3.2. Sıfır Sunucu Gecikmeli Arama & Filtreleme (`useMemo`)
Kullanıcı metin aradığında veya etiket seçtiğinde gereksiz render'ları önlemek amacıyla `useMemo` ile anlık filtreleme yapılır:

```typescript
const filteredDreams = useMemo(() => {
  return dreams
    .filter(dream => {
      if (filters.search.trim()) {
        const q = filters.search.toLowerCase();
        const match = dream.title.toLowerCase().includes(q) ||
                      dream.content.toLowerCase().includes(q) ||
                      dream.tags.some(t => t.toLowerCase().includes(q));
        if (!match) return false;
      }
      if (filters.tag && !dream.tags.includes(filters.tag)) return false;
      if (filters.mood && dream.mood !== filters.mood) return false;
      if (filters.onlyLucid && !dream.isLucid) return false;
      return true;
    })
    .sort((a, b) => filters.sort === 'newest' ? b.createdAt - a.createdAt : a.createdAt - b.createdAt);
}, [dreams, filters]);
```

### 3.3. Moment.js Türkçe Yerelleştirme ve Göreceli Zaman Motoru (`date.ts`)
Tüm tarih formatları için harici çeviriye gerek kalmaksızın Moment.js Türkçe yerelleştirmesi yapılandırılmıştır:

- **Göreceli Zaman:** `moment(timestamp).fromNow()` ➔ *"3 saat önce"*, *"birkaç dakika önce"*
- **Kısa Tarih:** `moment(date).format('DD MMM YYYY')` ➔ *"29 Eyl 2026"*
- **Detaylı Tarih:** `moment(date).format('LL')` ➔ *"29 Eylül 2026, Salı"*
- **Takvim Formatı:** `moment(timestamp).calendar()` ➔ *"Bugün 14:30"*, *"Dün 22:15"*

### 3.4. Günlük Rüya Serisi (Streak) Algoritması (`stats.ts`)
Kullanıcının ardışık kaç gündür rüya kaydettiğini hesaplayan algoritma:

```typescript
const uniqueDates = Array.from(new Set(dreams.map(d => d.date))).sort().reverse();
let streak = 0;
const todayStr = moment().format('YYYY-MM-DD');
const yesterdayStr = moment().subtract(1, 'day').format('YYYY-MM-DD');

// Bugün veya dün kayıt varsa seriyi başlat
if (uniqueDates.includes(todayStr) || uniqueDates.includes(yesterdayStr)) {
  streak = 1;
  let i = uniqueDates.includes(todayStr) ? 1 : 2;
  while (uniqueDates.includes(moment().subtract(i, 'days').format('YYYY-MM-DD'))) {
    streak++;
    i++;
  }
}
```

### 3.5. JSON Veri İçe / Dışa Aktarma (Backup & Restore)
- **Export:** Bellekteki rüya dizisini `application/json` MIME tipiyle geçici bir Blob URL'sine dönüştürür ve sanal bir `<a>` etiketi tetikleyerek indirir.
- **Import:** `FileReader.readAsText()` ile yüklenen dosyanın geçerli bir dizi olup olmadığını doğrular ve yerel belleği günceller.

---

## 🎨 4. Tasarım Sistemi (Design Tokens)

- **Açık Tema:** `#f6f7fb` nötr tuval, kartlar `bg-white`, kenarlıklar `border-slate-200/90`.
- **Karanlık Tema:** `bg-slate-950` derin gece tonu, kartlar `bg-slate-900`, kenarlıklar `border-slate-800`.
- **Marka Vurgusu:** `from-indigo-600 to-violet-600` degrade logo, buton ve sayaçlar.
- **Duygu Durum (Mood) Paleti:**
  - 😊 Mutlu: Zümrüt Yeşili (`emerald`)
  - 😌 Sakin: Gökyüzü Mavisi (`sky`)
  - 😐 Nötr: Nötr Gri (`slate`)
  - 😰 Kaygılı: Kehribar Sarısı (`amber`)
  - 😢 Hüzünlü & Melankolik: İndigo Moru (`indigo`)
  - 😱 Korkmuş: Gül Pembesi (`rose`)
