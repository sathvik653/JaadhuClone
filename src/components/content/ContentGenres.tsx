import React from 'react';
import { Genre } from '../../types/tmdb';

interface ContentGenresProps {
  genres: Genre[];
}

export function ContentGenres({ genres }: ContentGenresProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {genres.map((genre) => (
        <span
          key={genre.id}
          className="px-3 py-1 bg-gray-800 rounded-full text-sm"
        >
          {genre.name}
        </span>
      ))}
    </div>
  );
}