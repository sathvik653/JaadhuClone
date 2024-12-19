import React from 'react';
import { Play, Info } from 'lucide-react';
import { Movie } from '../types/tmdb';
import { getTMDBImageUrl } from '../lib/utils';

interface HeroProps {
  movie: Movie;
}

export function Hero({ movie }: HeroProps) {
  return (
    <div className="relative h-[550px] md:h-[650px] w-full">
      <div className="absolute inset-0">
        <img
          src={getTMDBImageUrl(movie.backdrop_path, 'original')}
          alt={movie.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
      </div>

      <div className="absolute bottom-0 left-0 right-0 px-4 md:px-6 pb-10 md:pb-20">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">{movie.title}</h1>
          <p className="text-lg text-gray-200 max-w-2xl mb-6">{movie.overview}</p>
          
          <div className="flex space-x-4">
            <button className="flex items-center space-x-2 bg-white text-black px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition">
              <Play className="w-5 h-5" />
              <span>Play Now</span>
            </button>
            <button className="flex items-center space-x-2 bg-gray-800/80 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-700/80 transition">
              <Info className="w-5 h-5" />
              <span>More Info</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}