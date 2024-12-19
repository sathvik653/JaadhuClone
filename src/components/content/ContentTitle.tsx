import React from 'react';
import { Movie, TVShow } from '../../types/tmdb';

interface ContentTitleProps {
  content: Movie | TVShow;
}

export function ContentTitle({ content }: ContentTitleProps) {
  const title = 'title' in content ? content.title : content.name;
  const releaseDate = 'release_date' in content ? content.release_date : content.first_air_date;
  const formattedDate = new Date(releaseDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="flex flex-col space-y-4">
      <h1 className="text-4xl md:text-5xl font-bold">{title}</h1>
      <div className="flex items-center space-x-4 text-sm md:text-base">
        <span>{formattedDate}</span>
        <span>•</span>
        <span>{content.vote_average.toFixed(1)} Rating</span>
        {('runtime' in content && content.runtime) && (
          <>
            <span>•</span>
            <span>{content.runtime} min</span>
          </>
        )}
      </div>
    </div>
  );
}