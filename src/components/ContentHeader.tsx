import React from 'react';
import { Play } from 'lucide-react';
import { Movie, TVShow } from '../types/tmdb';
import { getTMDBImageUrl } from '../lib/utils';

interface ContentHeaderProps {
  content: Movie | TVShow;
  onPlay: () => void;
}

export function ContentHeader({ content, onPlay }: ContentHeaderProps) {
  const title = 'title' in content ? content.title : content.name;
  
  return (
    <div className="flex flex-col md:flex-row gap-6 items-start">
      <img
        src={getTMDBImageUrl(content.poster_path)}
        alt={title}
        className="w-48 rounded-lg shadow-lg"
      />
      
      <div>
        <h1 className="text-4xl font-bold mb-4">{title}</h1>
        
        <button
          onClick={onPlay}
          className="flex items-center space-x-2 bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition"
        >
          <Play className="w-5 h-5" />
          <span>Play Now</span>
        </button>
      </div>
    </div>
  );
}