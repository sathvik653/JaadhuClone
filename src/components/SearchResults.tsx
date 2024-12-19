import React from 'react';
import { Link } from 'react-router-dom';
import { Movie, TVShow } from '../types/tmdb';
import { getTMDBImageUrl } from '../lib/utils';

interface SearchResultsProps {
  results: (Movie | TVShow)[];
  onResultClick: () => void;
}

export function SearchResults({ results, onResultClick }: SearchResultsProps) {
  if (results.length === 0) return null;

  return (
    <div className="absolute top-full left-0 right-0 mt-2 bg-black/95 rounded-lg shadow-lg overflow-hidden max-h-96 overflow-y-auto">
      {results.map((result) => {
        const isMovie = 'title' in result;
        const title = isMovie ? result.title : result.name;
        const type = isMovie ? 'movie' : 'tv';

        return (
          <Link
            key={result.id}
            to={`/${type}/${result.id}`}
            className="flex items-center p-3 hover:bg-gray-800 transition"
            onClick={onResultClick}
          >
            {result.poster_path && (
              <img
                src={getTMDBImageUrl(result.poster_path)}
                alt={title}
                className="w-12 h-16 object-cover rounded"
              />
            )}
            <div className="ml-3">
              <h4 className="text-white font-medium">{title}</h4>
              <p className="text-gray-400 text-sm capitalize">{type}</p>
            </div>
          </Link>
        );
      })}
    </div>
  );
}