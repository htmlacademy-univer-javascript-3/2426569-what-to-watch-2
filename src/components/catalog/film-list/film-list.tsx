import {SmallFilmCard} from './small-film-card';
import {memo, useState} from 'react';
import {FilmInfo} from '../../../types/film-info';

type Props = {
  filmsList: FilmInfo[];
  maxLength?: number;
}

const FilmListComponent = ({filmsList, maxLength = filmsList.length}: Props) => {
  const [activeFilm, setActiveFilm] = useState<string | null>(null);
  const handleCardHover = (filmId: string) => {
    setActiveFilm(filmId);
  };

  const handleCardLeave = () => {
    setActiveFilm(null);
  };

  return (
    <div className="catalog__films-list" data-testid="film-list">
      {filmsList.length === 0 && <span>Films not found</span>}
      {filmsList.slice(0, maxLength).map((film) => (
        <SmallFilmCard
          film={film}
          key={film.id}
          isActive={film.id === activeFilm}
          onMouseEnter={handleCardHover}
          onMouseLeave={handleCardLeave}
        />
      ))}
    </div>
  );
};

export const FilmList = memo(FilmListComponent);
