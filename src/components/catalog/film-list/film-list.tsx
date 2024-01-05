import {FilmInfo} from '../../../mocs/filmInfo.ts';
import {SmallFilmCard} from './small-film-card.tsx';
import {useState} from 'react';

type Props = {
  filmsData: FilmInfo[];
}

export const FilmList = ({filmsData}: Props) => {
  const [activeFilm, setActiveFilm] = useState<string | null>(null);
  const handleCardHover = (filmId: string) => {
    setActiveFilm(filmId);
  };

  const handleCardLeave = () => {
    setActiveFilm(null);
  };

  return (
    <div className="catalog__films-list">
      {filmsData.slice(0, filmsData.length).map((film) => (
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
