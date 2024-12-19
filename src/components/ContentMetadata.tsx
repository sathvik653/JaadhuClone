import React from 'react';
import { Star, Calendar, Clock, Globe2 } from 'lucide-react';
import { Movie, TVShow, Genre } from '../types/tmdb';

interface ContentMetadataProps {
  content: Movie | TVShow;
  genres: Genre[];
}

export function ContentMetadata({ content, genres }: ContentMetadataProps) {
  const isMovie = 'title' in content;
  const title = isMovie ? content.title : content.name;
  const releaseDate = isMovie ? content.release_date : content.first_air_date;

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-4">
        <div className="flex items-center text-yellow-400">
          <Star className="w-5 h-5 mr-1" />
          <span>{content.vote_average.toFixed(1)}/10</span>
        </div>
        <div className="flex items-center text-gray-300">
          <Calendar className="w-5 h-5 mr-1" />
          <span>{new Date(releaseDate).getFullYear()}</span>
        </div>
        {isMovie && (content as Movie).runtime && (
          <div className="flex items-center text-gray-300">
            <Clock className="w-5 h-5 mr-1" />
            <span>{(content as Movie).runtime} min</span>
          </div>
        )}
        {!isMovie && (content as TVShow).number_of_seasons && (
          <div className="flex items-center text-gray-300">
            <span>{(content as TVShow).number_of_seasons} Seasons</span>
          </div>
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        {genres.map((genre) => (
          <span
            key={genre.id}
            className="px-3 py-1 bg-gray-800 rounded-full text-sm text-gray-300"
          >
            {genre.name}
          </span>
        ))}
      </div>

      {content.spoken_languages && (
        <div className="flex items-center text-gray-300">
          <Globe2 className="w-5 h-5 mr-2" />
          <div className="flex flex-wrap gap-2">
            {content.spoken_languages.map((lang, index) => (
              <span key={index}>{lang.english_name}</span>
            )).reduce((prev, curr) => [prev, ', ', curr])}
          </div>
        </div>
      )}
    </div>
  );
}