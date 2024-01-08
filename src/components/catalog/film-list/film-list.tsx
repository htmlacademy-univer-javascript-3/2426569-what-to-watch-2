import {SmallFilmCard} from './small-film-card';
import {useState} from 'react';
import {FilmInfo} from '../../../types/film-info';

type Props = {
  filmsData: FilmInfo[];
  maxLength?: number;
}

export const FilmList = ({filmsData, maxLength = filmsData.length}: Props) => {
  const [activeFilm, setActiveFilm] = useState<string | null>(null);
  const handleCardHover = (filmId: string) => {
    setActiveFilm(filmId);
  };

  const handleCardLeave = () => {
    setActiveFilm(null);
  };

  return (
    <div className="catalog__films-list">
      {filmsData.length === 0 && <span>Films not found</span>}
      {filmsData.slice(0, maxLength).map((film) => (
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
