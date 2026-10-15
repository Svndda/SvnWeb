import type { CandyKind, SpecialCandy } from './types';

export const SIZE = 7;
export const TARGET = 1200;
export const POINTS_PER_CANDY = 50;
export const CLEAR_DELAY_MS = 170;
export const STORAGE_KEY = 'mi-amor-date';
export const AUDIO_STORAGE_KEY = 'mi-amor-audio';

export const CANDIES: readonly CandyKind[] = ['berry', 'cherry', 'grape', 'orange', 'lemon', 'blueberry'];

export const CANDY_LABELS: Record<CandyKind, string> = {
  berry: 'Fresa',
  cherry: 'Cereza',
  grape: 'Uvas',
  orange: 'Naranja',
  lemon: 'Limón',
  blueberry: 'Arándano',
};

export const SPECIAL_LABELS: Record<SpecialCandy, string> = {
  'striped-h': 'rayado horizontal',
  'striped-v': 'rayado vertical',
  wrapped: 'explosivo',
  'color-bomb': 'bomba de color',
};
