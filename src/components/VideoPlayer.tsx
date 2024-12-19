import React from 'react';
import { ArrowLeft } from 'lucide-react';

interface VideoPlayerProps {
  tmdbId: string;
  type: 'movie' | 'tv';
  onBack: () => void;
  season?: number;
  episode?: number;
}

export function VideoPlayer({ tmdbId, type, onBack, season, episode }: VideoPlayerProps) {
  const videoUrl = type === 'movie'
    ? `https://vidsrc.xyz/embed/movie/${tmdbId}`
    : `https://vidsrc.xyz/embed/tv/${tmdbId}/${season}/${episode}`;

  return (
    <div className="container mx-auto px-4 py-8">
      <button
        onClick={onBack}
        className="flex items-center text-gray-300 hover:text-white mb-4"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        Back to Details
      </button>
      
      <div className="aspect-video w-full bg-black rounded-lg overflow-hidden">
        <iframe
          src={videoUrl}
          className="w-full h-full"
          allowFullScreen
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          style={{ border: 'none' }}
        />
      </div>
    </div>
  );
}