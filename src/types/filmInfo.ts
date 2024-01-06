export interface FilmInfo {
  id: string;
  name: string;
  genre: string;
  released: number;
  backgroundImage: string;
  backgroundColor: string;
  posterImage: string;
  rating: number;
  runTime: number;
  scoresCount: number;
  videoLink: string;
  isFavorite: boolean;
  starring: string[];
  description: string;
  director: string;
}
