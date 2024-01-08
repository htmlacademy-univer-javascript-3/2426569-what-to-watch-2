import {memo} from 'react';

type GenreItemProps = {
  genre: string;
  isActive: boolean;
  onClick: () => void;
};
const GenreItemComponent = ({genre, isActive, onClick}: GenreItemProps) => (
  <li onClick={onClick} className={`catalog__genres-item ${isActive ? 'catalog__genres-item--active' : ''}`}>
    <a className="catalog__genres-link">{genre}</a>
  </li>
);

export const GenreItem = memo(GenreItemComponent);
