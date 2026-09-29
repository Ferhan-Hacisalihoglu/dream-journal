import moment from 'moment';

// Türkçe yerelleştirme ayarları
moment.updateLocale('tr', {
  months: 'Ocak_Şubat_Mart_Nisan_Mayıs_Haziran_Temmuz_Ağustos_Eylül_Ekim_Kasım_Aralık'.split('_'),
  monthsShort: 'Oca_Şub_Mar_Nis_May_Haz_Tem_Ağu_Eyl_Eki_Kas_Ara'.split('_'),
  weekdays: 'Pazar_Pazartesi_Salı_Çarşamba_Perşembe_Cuma_Cumartesi'.split('_'),
  weekdaysShort: 'Paz_Pts_Sal_Çar_Per_Cum_Cts'.split('_'),
  weekdaysMin: 'Pz_Pt_Sa_Ça_Pe_Cu_Ct'.split('_'),
  longDateFormat: {
    LT: 'HH:mm',
    LTS: 'HH:mm:ss',
    L: 'DD.MM.YYYY',
    LL: 'D MMMM YYYY',
    LLL: 'D MMMM YYYY HH:mm',
    LLLL: 'dddd, D MMMM YYYY HH:mm'
  },
  calendar: {
    sameDay: '[Bugün] HH:mm',
    nextDay: '[Yarın] HH:mm',
    nextWeek: 'dddd [saat] HH:mm',
    lastDay: '[Dün] HH:mm',
    lastWeek: '[Geçen] dddd [saat] HH:mm',
    sameElse: 'L'
  },
  relativeTime: {
    future: '%s sonra',
    past: '%s önce',
    s: 'birkaç saniye',
    ss: '%d saniye',
    m: 'bir dakika',
    mm: '%d dakika',
    h: 'bir saat',
    hh: '%d saat',
    d: 'bir gün',
    dd: '%d gün',
    M: 'bir ay',
    MM: '%d ay',
    y: 'bir yıl',
    yy: '%d yıl'
  }
});

moment.locale('tr');

/**
 * Göreceli zaman metni döner (örn: "birkaç saniye önce", "2 saat önce", "Dün")
 */
export const formatRelativeTime = (timestampOrDate: number | string): string => {
  if (!timestampOrDate) return '';
  return moment(timestampOrDate).fromNow();
};

/**
 * Kısa okunabilir tarih (örn: "29 Eyl 2026")
 */
export const formatShortDate = (date: string | number): string => {
  if (!date) return '';
  return moment(date).format('DD MMM YYYY');
};

/**
 * Tam ve detaylı tarih (örn: "29 Eylül 2026, Salı")
 */
export const formatFullDate = (date: string | number): string => {
  if (!date) return '';
  return moment(date).format('LL');
};

/**
 * Takvim görünümü (örn: "Bugün 14:30", "Dün 22:15")
 */
export const formatCalendarTime = (timestampOrDate: number | string): string => {
  if (!timestampOrDate) return '';
  return moment(timestampOrDate).calendar();
};

/**
 * HTML <input type="date"> için bugünün YYYY-MM-DD değerini döner
 */
export const getTodayInputDate = (): string => {
  return moment().format('YYYY-MM-DD');
};

/**
 * Verilen tarihin geçerli olup olmadığını kontrol eder
 */
export const isValidDate = (dateStr: string): boolean => {
  return moment(dateStr, 'YYYY-MM-DD', true).isValid();
};
