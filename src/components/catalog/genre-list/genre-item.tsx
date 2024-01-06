import {Genre} from '../../../types/genre.ts';

type GenreItemProps = {
  genre: Genre;
};
export const GenreItem = ({genre: {isActive, name}}: GenreItemProps) => (
  <li className={`catalog__genres-item ${isActive ? 'catalog__genres-item--active' : ''}`}>
    <a href="#" className="catalog__genres-link">{name}</a>
  </li>
);
