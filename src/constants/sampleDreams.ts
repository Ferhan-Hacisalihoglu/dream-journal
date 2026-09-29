import type { Dream } from '../interfaces/dream';
import moment from 'moment';

const now = Date.now();

export const SAMPLE_DREAMS: Dream[] = [
  {
    id: 'sample-1',
    title: 'Bulutların Üzerinde Süzülme',
    content: 'Kendimi masmavi gökyüzünde hafif bir rüzgarla uçarken buldum. Dağların dorukları altımda minyatür gibi kalıyordu. Rüyamda olduğumun tamamen farkındaydım ve hızımı düşüncelerimle kontrol edebiliyordum.',
    date: moment().format('YYYY-MM-DD'),
    mood: 'happy',
    tags: ['uçmak', 'gökyüzü', 'özgürlük', 'dağlar'],
    isLucid: true,
    createdAt: now - 1000 * 60 * 45, // 45 dakika önce
    updatedAt: now - 1000 * 60 * 45,
  },
  {
    id: 'sample-2',
    title: 'Derin Kristal Okyanus',
    content: 'Göz alabildiğine berrak bir denizin kıyısındaydım. Su o kadar şeffaftı ki dibindeki parıldayan mercanları ve rengarenk balıkları net görebiliyordum. Suyun altında nefes alabildiğimi fark ettim.',
    date: moment().subtract(1, 'day').format('YYYY-MM-DD'),
    mood: 'calm',
    tags: ['okyanus', 'su', 'mercan', 'huzur'],
    isLucid: false,
    createdAt: now - 1000 * 60 * 60 * 20, // 20 saat önce
    updatedAt: now - 1000 * 60 * 60 * 20,
  },
  {
    id: 'sample-3',
    title: 'Bitmeyen Labirent Tren Garı',
    content: 'Eski bir Viktorya dönemi tren istasyonunda kalkmak üzere olan trene yetişmeye çalışıyordum. Bilet elimdeydi ama hangi perona gitmem gerektiğini gösteren panolar sürekli değişiyordu.',
    date: moment().subtract(2, 'days').format('YYYY-MM-DD'),
    mood: 'anxious',
    tags: ['tren', 'yolculuk', 'labirent', 'gecikmek'],
    isLucid: false,
    createdAt: now - 1000 * 60 * 60 * 48,
    updatedAt: now - 1000 * 60 * 60 * 48,
  },
  {
    id: 'sample-4',
    title: 'Gölge Şehirde Kovalamaca',
    content: 'Neon ışıklarla aydınlatılmış karanlık bir şehrin dar sokaklarında bir silüetten kaçıyordum. Birden durdum, duvara dokundum ve burasının sadece zihnim olduğunu anladım. Şehir anında gün ışığına büründü.',
    date: moment().subtract(3, 'days').format('YYYY-MM-DD'),
    mood: 'scared',
    tags: ['şehir', 'kovalamaca', 'karanlık', 'uyanış'],
    isLucid: true,
    createdAt: now - 1000 * 60 * 60 * 72,
    updatedAt: now - 1000 * 60 * 60 * 72,
  },
  {
    id: 'sample-5',
    title: 'Sisli Sahilde Eski Bir Melodi',
    content: 'Gri bulutların kapladığı ıssız bir sahil boyunda tek başıma yürüyordum. Dalgaların kıyıya vuruş sesinin arasından tanıdık ama bir türlü çıkaramadığım nostaljik bir piyano melodisi yükseliyordu. Sanki geçmişte bıraktığım bir anının kokusu havada asılı kalmıştı; içimi derin bir hüzün ve tatlı bir özlem kapladı.',
    date: moment().subtract(4, 'days').format('YYYY-MM-DD'),
    mood: 'sad',
    tags: ['sahil', 'piyano', 'melodi', 'özlem', 'nostalji'],
    isLucid: false,
    createdAt: now - 1000 * 60 * 60 * 96, // 4 gün önce
    updatedAt: now - 1000 * 60 * 60 * 96,
  },
  {
    id: 'sample-6',
    title: 'Eski Bir Kütüphanede Sohbet',
    content: 'Tavanı göğe uzanan ahşap raflarla dolu devasa bir kütüphanede çocukluk arkadaşımla karşılaştım. Birlikte tozlu ansiklopedileri karıştırıp eski anılardan bahsettik.',
    date: moment().subtract(5, 'days').format('YYYY-MM-DD'),
    mood: 'neutral',
    tags: ['kitap', 'kütüphane', 'arkadaş', 'çocukluk'],
    isLucid: false,
    createdAt: now - 1000 * 60 * 60 * 120,
    updatedAt: now - 1000 * 60 * 60 * 120,
  }
];
