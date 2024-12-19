import { TMDB_API_KEY, TMDB_BASE_URL } from './utils';

export async function getVideoSources(tmdbId: string, type: 'movie' | 'tv'): Promise<string> {
  // VidSrc.cc now uses a different domain and structure
  // They recommend using their embed URL directly
  return `https://vidsrc.xyz/embed/${type}/${tmdbId}`;
}