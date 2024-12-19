import React from 'react';
import { useParams } from 'react-router-dom';
import { TMDB_API_KEY, TMDB_BASE_URL, getTMDBImageUrl } from '../lib/utils';
import { VideoPlayer } from '../components/VideoPlayer';
import { ContentMetadata } from '../components/ContentMetadata';
import { ContentTitle } from '../components/content/ContentTitle';
import { ContentGenres } from '../components/content/ContentGenres';
import { ContentOverview } from '../components/content/ContentOverview';
import { TVShowContent } from '../components/tv/TVShowContent';
import { Movie, TVShow, Genre } from '../types/tmdb';

export function ContentDetails() {
  const { type, id } = useParams<{ type: string; id: string }>();
  const [content, setContent] = React.useState<Movie | TVShow | null>(null);
  const [genres, setGenres] = React.useState<Genre[]>([]);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [currentEpisode, setCurrentEpisode] = React.useState<{
    season: number;
    episode: number;
  } | null>(null);

  React.useEffect(() => {
    const fetchContent = async () => {
      try {
        const contentResponse = await fetch(
          `${TMDB_BASE_URL}/${type}/${id}?api_key=${TMDB_API_KEY}`
        );
        const contentData = await contentResponse.json();
        setContent(contentData);
        setGenres(contentData.genres || []);
      } catch (error) {
        console.error('Error fetching content:', error);
      }
    };

    if (id && type) {
      fetchContent();
    }
  }, [id, type]);

  const handleEpisodePlay = (season: number, episode: number) => {
    setCurrentEpisode({ season, episode });
    setIsPlaying(true);
  };

  if (!content) {
    return (
      <div className="min-h-screen bg-black text-white pt-16 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  const isTVShow = !('title' in content);

  return (
    <div className="min-h-screen bg-black text-white pt-16">
      {isPlaying ? (
        <VideoPlayer
          tmdbId={id!}
          type={type as 'movie' | 'tv'}
          onBack={() => {
            setIsPlaying(false);
            setCurrentEpisode(null);
          }}
          season={currentEpisode?.season}
          episode={currentEpisode?.episode}
        />
      ) : (
        <div>
          <div className="relative h-[400px] md:h-[600px]">
            <img
              src={getTMDBImageUrl(content.backdrop_path, 'original')}
              alt={'title' in content ? content.title : content.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
          </div>

          <div className="max-w-7xl mx-auto px-4 md:px-6 -mt-32 relative z-10">
            <div className="space-y-6">
              <ContentTitle content={content} />
              <ContentGenres genres={genres} />

              {!isTVShow && (
                <button
                  onClick={() => setIsPlaying(true)}
                  className="bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 transition"
                >
                  Play Now
                </button>
              )}

              <ContentOverview content={content} />
              <ContentMetadata content={content} genres={genres} />

              {isTVShow && (
                <TVShowContent
                  show={content as TVShow}
                  onEpisodePlay={handleEpisodePlay}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}