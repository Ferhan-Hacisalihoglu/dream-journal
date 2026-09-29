# DreamJournal. — Rüya Günlüğü & Bilinçaltı Analizi

> Bilinçaltınızın haritasını çıkarın, rüyalarınızı unutmadan kaydedin ve sık görülen sembolleri analiz edin.

Bu proje, modern **React + Vite + TypeScript + Tailwind CSS** altyapısıyla geliştirilmiş, zaman ve göreceli tarih yönetimi için **Moment.js** kullanan, **[DoodleMind](https://github.com/Ferhan-Hacisalihoglu/DoodleMind)**'ın estetik çalışma masası (workbench) ve hap (pill) navigasyon mimarisinden esinlenilmiş interaktif bir web uygulamasıdır.

---

## 🌟 Öne Çıkan Özellikler

### 1. DoodleMind Tarzı Tasarım ve Navigasyon
- **Header & Pill Menü:** Sol tarafta degrade logolu marka alanı, ortada hap butonlarla sekmeli geçiş (`Rüyalarım`, `Yeni Rüya Yaz`, `Rüya Galerisi`, `İstatistikler`), sağda ise canlı durum rozeti ve karanlık/aydınlık tema butonu.
- **Hero Bölümü:** *"Gecenin fısıltılarını unutmadan kaydet."* karşılama başlığı ve el yazısı tarzında *"✍️ Her sembol bir ipucudur 💭"* notu.
- **2-Kolonlu Çalışma Masası (Workbench):**
  - **Sol Kolon:** Anlık metin araması, ruh hali çipleri, lucid rüya filtresi, sıralama ve rüya kartları akışı.
  - **Sağ Kolon:** Mini rüya analizi, lucid oranı, ruh hali dağılım barları ve tek tıkla *"Rastgele Bir Rüya Oku"* kartı.
- **Alt Temalar Çubuğu (ThemesBar - DoodleMind SamplesBar Karşılığı):** En sık görülen temaları (`#uçmak`, `#okyanus`, `#kovalamaca` vb.) yatay kaydırılabilir butonlar olarak sunar ve tıklandığında listeyi anında filtreler.

### 2. Kapsamlı CRUD & Veri Yönetimi
- **Ekle:** Başlık, tarih, ruh hali seçici (`MoodPicker`), Lucid anahtarı, etiketler (`TagInput`) ve detaylı rüya içeriği. Başarılı kayıtta konfeti kutlaması.
- **Listele:** Moment.js ile göreceli zaman ("3 saat önce", "Dün gece") ve biçimlendirilmiş takvim tarihleri.
- **Detay & İnceleme:** Rüya kartına tıklandığında açılan zengin detay modalı.
- **Güncelle:** Kayıtlı rüyaları modal üzerinden anında düzenleme.
- **Sil:** Yanlışlıkla silmeyi önleyen onay penceresi (`ConfirmDialog`).
- **Yedekleme:** Rüyaları JSON formatında bilgisayara indirme (Export) ve geri yükleme (Import).

### 3. Gelişmiş Zaman & Tarih (`Moment.js`)
- Türkçe dil desteğiyle göreceli zamanlar (`moment(createdAt).fromNow()`).
- Tam tarih formatları (`moment(date).format('LL')`).
- Günlük kayıt tutma serisi (Streak) hesabı.

### 4. Analitik & İstatistikler
- Toplam rüya sayısı, bu ay kaydedilen rüyalar, lucid rüya oranı ve aktif rüya serisi.
- En sık görülen 10 temanın Tailwind CSS yatay bar grafikleriyle gösterimi.
- 6 farklı ruh halinin (Mutlu, Sakin, Nötr, Kaygılı, Hüzünlü, Korkmuş) yüzdesel ve sayısal dağılımı.

---

## 🛠️ Teknoloji Yığını (Tech Stack)

| Teknoloji | Sürüm | Kullanım Amacı |
| :--- | :--- | :--- |
| **React** | 19 | Kullanıcı arayüzü ve bileşen mimarisi |
| **TypeScript** | 5 / 6 | Tip güvenliği ve ölçeklenebilir kodlama |
| **Vite** | 6 / 8 | Ultra hızlı geliştirme sunucusu ve paketleme |
| **Tailwind CSS** | 4 | Modern, yardımcı sınıf tabanlı stil ve koyu tema |
| **Moment.js** | 2.31 | Zaman formatlama, yerelleştirme ve göreceli tarihler |
| **Lucide React** | 1.48 | Vektörel, minimalist arayüz ikonları |
| **Canvas Confetti** | 1.9 | Yeni rüya kaydında kutlama efekti |

---

## 🚀 Kurulum ve Çalıştırma

Projeyi yerel makinenizde çalıştırmak için:

```bash
# 1. Proje dizinine gidin
cd c:/Project/Other/dream-journal

# 2. Bağımlılıkları yükleyin
npm install --legacy-peer-deps

# 3. Geliştirme sunucusunu başlatın
npm run dev
```

Tarayıcınızda açılan adrese (genellikle `http://localhost:5173`) giderek uygulamayı kullanmaya başlayabilirsiniz.

### Üretim (Production) Derlemesi:

```bash
npm run build
```

Derlenen dosyalar `dist/` klasöründe hazır hale gelir. Proje, Netlify üzerinde doğrudan tek tıkla yayınlanabilir (`public/_redirects` dosyası dahil edilmiştir).
