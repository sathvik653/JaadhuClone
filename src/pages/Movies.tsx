import React, { useEffect, useState } from 'react';
import { TMDB_API_KEY, TMDB_BASE_URL } from '../lib/utils';
import { Movie } from '../types/tmdb';
import { ContentSlider } from '../components/ContentSlider';

export function Movies() {
  const [popularMovies, setPopularMovies] = useState<Movie[]>([]);
  const [topRatedMovies, setTopRatedMovies] = useState<Movie[]>([]);
  const [upcomingMovies, setUpcomingMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const [popularRes, topRatedRes, upcomingRes] = await Promise.all([
          fetch(`${TMDB_BASE_URL}/movie/popular?api_key=${TMDB_API_KEY}`),
          fetch(`${TMDB_BASE_URL}/movie/top_rated?api_key=${TMDB_API_KEY}`),
          fetch(`${TMDB_BASE_URL}/movie/upcoming?api_key=${TMDB_API_KEY}`),
        ]);

        const [popularData, topRatedData, upcomingData] = await Promise.all([
          popularRes.json(),
          topRatedRes.json(),
          upcomingRes.json(),
        ]);

        setPopularMovies(popularData.results);
        setTopRatedMovies(topRatedData.results);
        setUpcomingMovies(upcomingData.results);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovies();
  }, []);

  return (
    <main className="pt-24 pb-8 min-h-screen bg-black">
      <div className="max-w-7xl mx-auto px-4 space-y-8">
        <h1 className="text-3xl font-bold text-white mb-8">Movies</h1>
        <ContentSlider title="Popular Movies" items={popularMovies} />
        <ContentSlider title="Top Rated Movies" items={topRatedMovies} />
        <ContentSlider title="Upcoming Movies" items={upcomingMovies} />
      </div>
    </main>
  );
}