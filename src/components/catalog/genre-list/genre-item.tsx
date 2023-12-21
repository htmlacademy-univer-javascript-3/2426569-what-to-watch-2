import {GenreProps} from '../../../mocs/genres.ts';

type GenreItemProps = {
  genre: GenreProps;
};
export const GenreItem = ({genre: {isActive, name}}: GenreItemProps) => (
  <li className={`catalog__genres-item ${isActive ? 'catalog__genres-item--active' : ''}`}>
    <a href="#" className="catalog__genres-link">{name}</a>
  </li>
);
