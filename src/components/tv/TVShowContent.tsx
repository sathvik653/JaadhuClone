import React, { useState, useEffect } from 'react';
import { TMDB_API_KEY, TMDB_BASE_URL } from '../../lib/utils';
import { TVShow, Episode } from '../../types/tmdb';
import { SeasonSelector } from './SeasonSelector';
import { EpisodeList } from './EpisodeList';

interface TVShowContentProps {
  show: TVShow;
  onEpisodePlay: (season: number, episode: number) => void;
}

export function TVShowContent({ show, onEpisodePlay }: TVShowContentProps) {
  const [currentSeason, setCurrentSeason] = useState(1);
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSeasonDetails = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `${TMDB_BASE_URL}/tv/${show.id}/season/${currentSeason}?api_key=${TMDB_API_KEY}`
        );
        const data = await response.json();
        setEpisodes(data.episodes || []);
      } catch (error) {
        console.error('Error fetching season details:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSeasonDetails();
  }, [show.id, currentSeason]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Episodes</h2>
        <SeasonSelector
          seasons={show.number_of_seasons || 1}
          currentSeason={currentSeason}
          onSeasonChange={setCurrentSeason}
        />
      </div>

      {isLoading ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary-500"></div>
        </div>
      ) : (
        <EpisodeList
          episodes={episodes}
          onEpisodePlay={(episodeNumber) => onEpisodePlay(currentSeason, episodeNumber)}
        />
      )}
    </div>
  );
}