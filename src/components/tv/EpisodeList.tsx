import React from 'react';
import { Play } from 'lucide-react';
import { Episode } from '../../types/tmdb';
import { getTMDBImageUrl } from '../../lib/utils';

interface EpisodeListProps {
  episodes: Episode[];
  onEpisodePlay: (episodeNumber: number) => void;
}

export function EpisodeList({ episodes, onEpisodePlay }: EpisodeListProps) {
  return (
    <div className="grid gap-4">
      {episodes.map((episode) => (
        <div
          key={episode.id}
          className="bg-gray-800/50 rounded-lg overflow-hidden hover:bg-gray-800 transition"
        >
          <div className="flex flex-col md:flex-row">
            {episode.still_path && (
              <img
                src={getTMDBImageUrl(episode.still_path)}
                alt={episode.name}
                className="w-full md:w-48 h-32 object-cover"
              />
            )}
            <div className="p-4 flex-1 flex flex-col">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-lg font-semibold">
                    {episode.episode_number}. {episode.name}
                  </h3>
                  <p className="text-sm text-gray-400">
                    {new Date(episode.air_date).toLocaleDateString()}
                  </p>
                </div>
                <button
                  onClick={() => onEpisodePlay(episode.episode_number)}
                  className="flex items-center space-x-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition"
                >
                  <Play className="w-4 h-4" />
                  <span>Play</span>
                </button>
              </div>
              <p className="mt-2 text-sm text-gray-300 line-clamp-2">
                {episode.overview}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}