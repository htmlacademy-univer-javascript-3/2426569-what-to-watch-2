import {GenreList} from './genre-list/genre-list.tsx';
import {FilmList} from './film-list/film-list.tsx';
import {FilmInfo} from '../../mocs/filmInfo.ts';

interface Props {
  filmsData: FilmInfo[];
  withoutGenres?: boolean;
  withoutShowMore?: boolean;
}

function ShowMoreButton() {
  return (
    <div className="catalog__more">
      <button className="catalog__button" type="button">Show more</button>
    </div>
  );
}

export const Catalog = ({filmsData, withoutGenres = false, withoutShowMore = false}: Props) => (
  <section className="catalog">
    <h2 className="catalog__title visually-hidden">Catalog</h2>

    {!withoutGenres ? <GenreList/> : null}

    <FilmList filmsData={filmsData}/>

    {!withoutShowMore ? <ShowMoreButton/> : null}

  </section>
);
