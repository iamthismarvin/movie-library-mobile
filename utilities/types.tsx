export interface LibraryMovie extends AddToLibraryMovie {
  id: number;
  created_at: Date;
  updated_at: Date;
}

export interface AddToLibraryMovie {
  purchased_at: string | null;
  purchase_location: string | null;
  library_id: string | null;
  imdb_id: string;
  type: string;
  notes: string | null;
  info: {
    plot: string;
    year: number;
    cover: string;
    genre: string[];
    title: string;
    actors: string[];
    writer: string[];
    director: string[];
    runtime: string;
  };
  format: {
    bluray_hd: boolean;
    bluray_uhd: boolean;
    digital: boolean;
    dvd: boolean;
  };
}

export interface SearchedMovie {
  Title: string;
  Year: number;
  imdbID: string;
  Type: string;
  Poster: string;
}

export type OptionalMovieField = string;
