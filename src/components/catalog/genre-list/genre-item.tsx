type GenreItemProps = {
  genre: string;
  isActive: boolean;
  onClick: () => void;
};
export const GenreItem = ({genre, isActive, onClick}: GenreItemProps) => (
  <li onClick={onClick} className={`catalog__genres-item ${isActive ? 'catalog__genres-item--active' : ''}`}>
    <a className="catalog__genres-link">{genre}</a>
  </li>
);
