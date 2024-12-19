import React from 'react';
import { Hero } from '../components/Hero';
import { ContentSlider } from '../components/ContentSlider';
import { TMDB_API_KEY, TMDB_BASE_URL } from '../lib/utils';
import { Movie, TVShow } from '../types/tmdb';

export function Home() {
  const [trendingMovies, setTrendingMovies] = React.useState<Movie[]>([]);
  const [popularTVShows, setPopularTVShows] = React.useState<TVShow[]>([]);
  const [featuredMovie, setFeaturedMovie] = React.useState<Movie | null>(null);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch trending movies
        const moviesResponse = await fetch(
          `${TMDB_BASE_URL}/trending/movie/week?api_key=${TMDB_API_KEY}`
        );
        const moviesData = await moviesResponse.json();
        setTrendingMovies(moviesData.results);
        setFeaturedMovie(moviesData.results[0]);

        // Fetch popular TV shows
        const tvResponse = await fetch(
          `${TMDB_BASE_URL}/tv/popular?api_key=${TMDB_API_KEY}`
        );
        const tvData = await tvResponse.json();
        setPopularTVShows(tvData.results);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  if (!featuredMovie) {
    return <div>Loading...</div>;
  }

  return (
    <main className="pt-16">
      <Hero movie={featuredMovie} />
      
      <div className="space-y-8 mt-8">
        <ContentSlider title="Trending Movies" items={trendingMovies} />
        <ContentSlider title="Popular TV Shows" items={popularTVShows} />
      </div>
    </main>
  );
}