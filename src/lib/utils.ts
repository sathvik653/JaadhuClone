import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const TMDB_API_KEY = '4e44d9029b1270a757cddc766a1bcb63';
export const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
export const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';

export function getTMDBImageUrl(path: string, size: 'w500' | 'original' = 'w500') {
  return `${TMDB_IMAGE_BASE_URL}/${size}${path}`;
}