export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  vote_average: number;
  release_date: string;
  genre_ids: number[];
  runtime?: number;
  spoken_languages?: Array<{ english_name: string }>;
  production_countries?: Array<{ iso_3166_1: string; name: string }>;
  status?: string;
  budget?: number;
  revenue?: number;
}

export interface TVShow {
  id: number;
  name: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  vote_average: number;
  first_air_date: string;
  genre_ids: number[];
  number_of_seasons?: number;
  number_of_episodes?: number;
  spoken_languages?: Array<{ english_name: string }>;
  production_countries?: Array<{ iso_3166_1: string; name: string }>;
  status?: string;
  type?: string;
}

export interface Episode {
  id: number;
  name: string;
  overview: string;
  episode_number: number;
  air_date: string;
  still_path: string | null;
  vote_average: number;
}

export interface Genre {
  id: number;
  name: string;
}