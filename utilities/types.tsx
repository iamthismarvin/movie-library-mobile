export interface LibraryMovie {
  id: 9;
  created_at: Date;
  updated_at: Date;
  purchased_at: Date;
  library_id: string;
  notes: string;
  info: {
    plot: string;
    year: number;
    cover: string;
    genre: string[];
    title: string;
    actors: string[];
    writer: string[];
    director: string[];
  };
}

export interface SearchedMovie {
  Title: string;
  Year: number;
  imdbID: string;
  Type: string;
  Poster: string;
}
