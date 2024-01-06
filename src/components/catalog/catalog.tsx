import {GenreList} from './genre-list/genre-list.tsx';
import {FilmList} from './film-list/film-list.tsx';
import {FilmInfo} from '../../types/filmInfo.ts';

interface Props {
  withoutGenres?: boolean;
  withoutShowMore?: boolean;
  films: FilmInfo[];
}

function ShowMoreButton() {
  return (
    <div className="catalog__more">
      <button className="catalog__button" type="button">Show more</button>
    </div>
  );
}

export const Catalog = ({withoutGenres = false, withoutShowMore = false, films}: Props) => (
  <section className="catalog">
    <h2 className="catalog__title visually-hidden">Catalog</h2>

    {!withoutGenres ? <GenreList/> : null}

    <FilmList filmsData={films}/>

    {!withoutShowMore ? <ShowMoreButton/> : null}

  </section>
);
