import type { Dream } from '../interfaces/dream';
import moment from 'moment';

export const exportDreamsToJson = (dreams: Dream[]) => {
  const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(dreams, null, 2));
  const downloadAnchor = document.createElement('a');
  const filename = `ruya-gunlugu-yedek-${moment().format('YYYY-MM-DD-HHmm')}.json`;
  downloadAnchor.setAttribute('href', dataStr);
  downloadAnchor.setAttribute('download', filename);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
};

export const importDreamsFromJson = (file: File): Promise<Dream[]> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (Array.isArray(parsed)) {
          resolve(parsed as Dream[]);
        } else {
          reject(new Error('Yüklenen dosya geçerli bir rüya listesi içermiyor.'));
        }
      } catch (err) {
        reject(new Error('JSON dosyası okunamadı veya bozuk: ' + (err as Error).message));
      }
    };
    reader.onerror = () => reject(new Error('Dosya okuma hatası.'));
    reader.readAsText(file);
  });
};
