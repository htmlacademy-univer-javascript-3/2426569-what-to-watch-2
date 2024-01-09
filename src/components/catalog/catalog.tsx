import {GenreList} from './genre-list/genre-list';
import {FilmList} from './film-list/film-list';
import {memo, useCallback, useEffect, useState} from 'react';
import {MAX_FILMS_IN_PAGE} from '../../consts';
import {FilmInfo} from '../../types/film-info';
import {SpinnerWrapper} from '../spinner/spinner-wrapper';


interface Props {
  withoutGenres?: boolean;
  withoutShowMore?: boolean;
  filmsList: FilmInfo[];
  isLoading: boolean;
}

interface ShowMoreButtonProps {
  onClick: () => void;
}

const ShowMoreButtonComponent: React.FC<ShowMoreButtonProps> = ({onClick}: ShowMoreButtonProps) => (
  <div className="catalog__more">
    <button className="catalog__button" type="button" onClick={onClick}>Show more</button>
  </div>
);

const ShowMoreButton = memo(ShowMoreButtonComponent);

export const CatalogComponent = ({withoutGenres = false, withoutShowMore = false, filmsList, isLoading}: Props) => {
  const maxFilmCount = withoutShowMore ? filmsList.length : MAX_FILMS_IN_PAGE;
  const [visibleFilms, setVisibleFilms] = useState(maxFilmCount);

  useEffect(() => {
    setVisibleFilms(withoutShowMore ? filmsList.length : MAX_FILMS_IN_PAGE);
  }, [filmsList, withoutShowMore]);

  const handleShowMoreClick = useCallback(() => {
    setVisibleFilms((prevVisibleFilms) => prevVisibleFilms + MAX_FILMS_IN_PAGE);
  }, [setVisibleFilms]);

  return (
    <section className="catalog" data-testid="catalog">
      <h2 className="catalog__title visually-hidden">Catalog</h2>
      <SpinnerWrapper isLoading={isLoading}>
        {!withoutGenres ? <GenreList/> : null}

        <FilmList filmsList={filmsList} maxLength={visibleFilms}/>

        {!withoutShowMore && visibleFilms < (filmsList?.length ?? 0) ? (
          <ShowMoreButton onClick={handleShowMoreClick} />
        ) : null}
      </SpinnerWrapper>
    </section>
  );
};

export const Catalog = memo(CatalogComponent);
