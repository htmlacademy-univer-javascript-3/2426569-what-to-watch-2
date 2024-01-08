import {GenreList} from './genre-list/genre-list';
import {FilmList} from './film-list/film-list';
import {useEffect, useState} from 'react';
import {MAX_FILMS_IN_PAGE} from '../../consts';
import {FilmInfo} from '../../types/film-info';
import {SpinnerWrapper} from '../spinner/spinner-wrapper';


interface Props {
  withoutGenres?: boolean;
  withoutShowMore?: boolean;
  films: FilmInfo[];
  isLoading: boolean;
}

interface ShowMoreButtonProps {
  onClick: () => void;
}

const ShowMoreButton: React.FC<ShowMoreButtonProps> = ({onClick}: ShowMoreButtonProps) => (
  <div className="catalog__more">
    <button className="catalog__button" type="button" onClick={onClick}>Show more</button>
  </div>
);

export const Catalog = ({withoutGenres = false, withoutShowMore = false, films, isLoading}: Props) => {
  const maxFilmCount = withoutShowMore ? films.length : MAX_FILMS_IN_PAGE;
  const [visibleFilms, setVisibleFilms] = useState(maxFilmCount);

  useEffect(() => {
    setVisibleFilms(withoutShowMore ? films.length : MAX_FILMS_IN_PAGE);
  }, [films, withoutShowMore]);

  const handleShowMoreClick = () => {
    setVisibleFilms((prevVisibleFilms) => prevVisibleFilms + MAX_FILMS_IN_PAGE);
  };

  return (
    <section className="catalog">
      <h2 className="catalog__title visually-hidden">Catalog</h2>
      <SpinnerWrapper isLoading={isLoading}>
        {!withoutGenres ? <GenreList/> : null}

        <FilmList filmsData={films} maxLength={visibleFilms}/>

        {!withoutShowMore && visibleFilms < films.length ? (
          <ShowMoreButton onClick={handleShowMoreClick} />
        ) : null}
      </SpinnerWrapper>
    </section>
  );
};
