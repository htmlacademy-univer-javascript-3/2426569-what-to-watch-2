import {GenreList} from './genre-list/genre-list.tsx';
import {FilmList} from './film-list/film-list.tsx';
import {FilmInfo} from '../../types/filmInfo.ts';
import {useState} from 'react';
import {MAX_FILMS_IN_PAGE} from '../../consts.ts';

interface Props {
  withoutGenres?: boolean;
  withoutShowMore?: boolean;
  films: FilmInfo[];
}

interface ShowMoreButtonProps {
  onClick: () => void;
}

const ShowMoreButton: React.FC<ShowMoreButtonProps> = ({onClick}: ShowMoreButtonProps) => (
  <div className="catalog__more">
    <button className="catalog__button" type="button" onClick={onClick}>Show more</button>
  </div>
);

export const Catalog = ({withoutGenres = false, withoutShowMore = false, films}: Props) => {
  const maxFilmCount = withoutShowMore ? films.length : MAX_FILMS_IN_PAGE;
  const [visibleFilms, setVisibleFilms] = useState(maxFilmCount);

  const handleShowMoreClick = () => {
    setVisibleFilms((prevVisibleFilms) => prevVisibleFilms + MAX_FILMS_IN_PAGE);
  };

  return (
    <section className="catalog">
      <h2 className="catalog__title visually-hidden">Catalog</h2>

      {!withoutGenres ? <GenreList/> : null}

      <FilmList filmsData={films} maxLength={visibleFilms}/>

      {!withoutShowMore && visibleFilms < films.length ? (
        <ShowMoreButton onClick={handleShowMoreClick} />
      ) : null}
    </section>
  );
};
