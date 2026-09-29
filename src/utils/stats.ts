import type { Dream, Mood } from '../interfaces/dream';
import moment from 'moment';

export interface TagStat {
  tag: string;
  count: number;
  percentage: number;
}

export interface MoodStat {
  mood: Mood;
  count: number;
  percentage: number;
}

export interface OverallStats {
  totalDreams: number;
  lucidDreams: number;
  lucidPercentage: number;
  thisMonthCount: number;
  currentStreakDays: number;
  topTags: TagStat[];
  moodDistribution: MoodStat[];
}

export const calculateStats = (dreams: Dream[]): OverallStats => {
  const total = dreams.length;
  if (total === 0) {
    return {
      totalDreams: 0,
      lucidDreams: 0,
      lucidPercentage: 0,
      thisMonthCount: 0,
      currentStreakDays: 0,
      topTags: [],
      moodDistribution: [],
    };
  }

  // Lucid rüyalar
  const lucidCount = dreams.filter(d => d.isLucid).length;
  const lucidPercentage = Math.round((lucidCount / total) * 100);

  // Bu ayki rüyalar
  const currentMonth = moment().format('YYYY-MM');
  const thisMonthCount = dreams.filter(d => d.date.startsWith(currentMonth)).length;

  // Etiket frekansı
  const tagCounts: Record<string, number> = {};
  dreams.forEach(dream => {
    dream.tags.forEach(tag => {
      const cleanTag = tag.trim().toLowerCase();
      if (cleanTag) {
        tagCounts[cleanTag] = (tagCounts[cleanTag] || 0) + 1;
      }
    });
  });

  const sortedTags = Object.entries(tagCounts)
    .sort((a, b) => b[1] - a[1])
    .map(([tag, count]) => ({
      tag,
      count,
      percentage: Math.round((count / total) * 100),
    }));

  // Ruh hali dağılımı
  const moodCounts: Record<Mood, number> = {
    happy: 0,
    calm: 0,
    neutral: 0,
    anxious: 0,
    sad: 0,
    scared: 0,
  };

  dreams.forEach(d => {
    if (moodCounts[d.mood] !== undefined) {
      moodCounts[d.mood]++;
    }
  });

  const moodDistribution: MoodStat[] = (Object.keys(moodCounts) as Mood[])
    .map(mood => ({
      mood,
      count: moodCounts[mood],
      percentage: Math.round((moodCounts[mood] / total) * 100),
    }))
    .sort((a, b) => b.count - a.count);

  // Rüya Serisi (Günlük streak)
  const uniqueDates = Array.from(new Set(dreams.map(d => d.date))).sort().reverse();
  let streak = 0;
  const checkDate = moment().startOf('day');

  // Bugün rüya kaydedilmediyse dün kontrol edilir
  const todayStr = checkDate.format('YYYY-MM-DD');
  const yesterdayStr = moment().subtract(1, 'day').format('YYYY-MM-DD');

  if (uniqueDates.includes(todayStr)) {
    streak = 1;
    let i = 1;
    while (uniqueDates.includes(moment().subtract(i, 'days').format('YYYY-MM-DD'))) {
      streak++;
      i++;
    }
  } else if (uniqueDates.includes(yesterdayStr)) {
    streak = 1;
    let i = 2;
    while (uniqueDates.includes(moment().subtract(i, 'days').format('YYYY-MM-DD'))) {
      streak++;
      i++;
    }
  }

  return {
    totalDreams: total,
    lucidDreams: lucidCount,
    lucidPercentage,
    thisMonthCount,
    currentStreakDays: streak,
    topTags: sortedTags.slice(0, 10),
    moodDistribution,
  };
};
