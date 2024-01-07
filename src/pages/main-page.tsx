import * as React from 'react';
import {Footer} from '../components/footer/footer.tsx';
import {Catalog} from '../components/catalog/catalog.tsx';
import {FilmCard} from '../components/film-card/film-card.tsx';
import {selectFilteredByGenreFilms, selectIsFilmsLoading, selectPromo} from '../store/reducer.ts';
import {useSelector} from 'react-redux';

export const MainPage = () => {
  const promo = useSelector(selectPromo);
  const filteredFilms = useSelector(selectFilteredByGenreFilms);
  const isLoading = useSelector(selectIsFilmsLoading);

  return (
    <React.Fragment>
      <FilmCard film={promo} isLoading={isLoading}/>

      <div className="page-content">
        <Catalog films={filteredFilms} isLoading={isLoading}/>
        <Footer/>
      </div>
    </React.Fragment>
  );
};
