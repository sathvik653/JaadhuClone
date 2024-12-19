import React, { useEffect, useState } from 'react';
import { TMDB_API_KEY, TMDB_BASE_URL } from '../lib/utils';
import { TVShow } from '../types/tmdb';
import { ContentSlider } from '../components/ContentSlider';

export function TVShows() {
  const [popularShows, setPopularShows] = useState<TVShow[]>([]);
  const [topRatedShows, setTopRatedShows] = useState<TVShow[]>([]);
  const [airingToday, setAiringToday] = useState<TVShow[]>([]);

  useEffect(() => {
    const fetchShows = async () => {
      try {
        const [popularRes, topRatedRes, airingRes] = await Promise.all([
          fetch(`${TMDB_BASE_URL}/tv/popular?api_key=${TMDB_API_KEY}`),
          fetch(`${TMDB_BASE_URL}/tv/top_rated?api_key=${TMDB_API_KEY}`),
          fetch(`${TMDB_BASE_URL}/tv/airing_today?api_key=${TMDB_API_KEY}`),
        ]);

        const [popularData, topRatedData, airingData] = await Promise.all([
          popularRes.json(),
          topRatedRes.json(),
          airingRes.json(),
        ]);

        setPopularShows(popularData.results);
        setTopRatedShows(topRatedData.results);
        setAiringToday(airingData.results);
      } catch (error) {
        console.error('Error fetching TV shows:', error);
      }
    };

    fetchShows();
  }, []);

  return (
    <main className="pt-24 pb-8 min-h-screen bg-black">
      <div className="max-w-7xl mx-auto px-4 space-y-8">
        <h1 className="text-3xl font-bold text-white mb-8">TV Shows</h1>
        <ContentSlider title="Popular Shows" items={popularShows} />
        <ContentSlider title="Top Rated Shows" items={topRatedShows} />
        <ContentSlider title="Airing Today" items={airingToday} />
      </div>
    </main>
  );
}