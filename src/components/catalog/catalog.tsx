import {GenreList} from './genre-list/genreList.tsx';
import {FilmList} from './film-list/filmList.tsx';

export const Catalog = () => (
  <section className="catalog">
    <h2 className="catalog__title visually-hidden">Catalog</h2>

    <GenreList/>
    <FilmList/>

    <div className="catalog__more">
      <button className="catalog__button" type="button">Show more</button>
    </div>
  </section>
);
