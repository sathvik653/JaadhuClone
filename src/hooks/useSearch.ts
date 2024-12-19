import { useState, useEffect } from 'react';
import { TMDB_API_KEY, TMDB_BASE_URL } from '../lib/utils';
import { Movie, TVShow } from '../types/tmdb';

export function useSearch() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<(Movie | TVShow)[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    const searchContent = async () => {
      if (!searchQuery.trim()) {
        setSearchResults([]);
        return;
      }

      setIsSearching(true);
      try {
        const response = await fetch(
          `${TMDB_BASE_URL}/search/multi?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(
            searchQuery
          )}`
        );
        const data = await response.json();
        setSearchResults(
          data.results.filter(
            (item: any) => item.media_type === 'movie' || item.media_type === 'tv'
          )
        );
      } catch (error) {
        console.error('Error searching:', error);
        setSearchResults([]);
      } finally {
        setIsSearching(false);
      }
    };

    const debounceTimeout = setTimeout(searchContent, 300);
    return () => clearTimeout(debounceTimeout);
  }, [searchQuery]);

  return { searchQuery, setSearchQuery, searchResults, isSearching };
}