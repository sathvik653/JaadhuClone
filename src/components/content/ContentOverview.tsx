import React from 'react';
import { Movie, TVShow } from '../../types/tmdb';

interface ContentOverviewProps {
  content: Movie | TVShow;
}

export function ContentOverview({ content }: ContentOverviewProps) {
  return (
    <div className="prose prose-invert max-w-none">
      <h2 className="text-2xl font-bold mb-2">Overview</h2>
      <p className="text-gray-300 text-lg leading-relaxed">
        {content.overview}
      </p>
    </div>
  );
}