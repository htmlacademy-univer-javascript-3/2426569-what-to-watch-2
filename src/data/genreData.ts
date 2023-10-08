export const GENRE_LIST: GenreProps[] = [
  { id: 1, isActive: true, name: 'All genres' },
  { id: 2, isActive: false, name: 'Comedies' },
  { id: 3, isActive: false, name: 'Crime' },
  { id: 4, isActive: false, name: 'Documentary' },
  { id: 5, isActive: false, name: 'Dramas' },
  { id: 6, isActive: false, name: 'Horror' },
  { id: 7, isActive: false, name: 'Kids & Family' },
  { id: 8, isActive: false, name: 'Romance' },
  { id: 9, isActive: false, name: 'Sci-Fi' },
  { id: 10, isActive: false, name: 'Thrillers' },
];

export type GenreProps = {
  id: number;
  isActive: boolean;
  name: string;
}
