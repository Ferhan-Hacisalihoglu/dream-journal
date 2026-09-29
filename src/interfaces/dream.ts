export type Mood = 'happy' | 'calm' | 'neutral' | 'anxious' | 'sad' | 'scared';

export interface Dream {
  id: string;
  title: string;
  content: string;
  date: string; // ISO format "YYYY-MM-DD"
  mood: Mood;
  tags: string[];
  isLucid: boolean;
  createdAt: number;
  updatedAt: number;
}

export interface DreamFilters {
  search: string;
  tag: string | null;
  mood: Mood | null;
  onlyLucid: boolean;
  sort: 'newest' | 'oldest';
}

export interface MoodMeta {
  type: Mood;
  label: string;
  emoji: string;
  bgLight: string;
  textLight: string;
  borderLight: string;
  bgDark: string;
  textDark: string;
  borderDark: string;
  barColor: string;
}
