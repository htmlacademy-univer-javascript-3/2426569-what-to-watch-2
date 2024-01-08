export interface FilmShortInfo {
  id: string;
  name: string;
  posterImage: string;
  backgroundImage: string;
  videoLink: string;
  genre: string;
  released: number;
  isFavorite: boolean;
}

export interface FilmDetailsInfo extends FilmShortInfo {
  backgroundColor: string;
  rating: number;
  runTime: number;
  scoresCount: number;
  starring: string[];
  description: string;
  director: string;
}
