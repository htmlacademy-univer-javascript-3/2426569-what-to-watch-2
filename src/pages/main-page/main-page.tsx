import * as React from 'react';
import {Footer} from '../../components/footer/footer.tsx';
import {Catalog} from '../../components/catalog/catalog.tsx';
import {FilmCard} from '../../components/film-card/film-card.tsx';
import {useSelector} from 'react-redux';
import {
  selectFilteredByGenreFilms,
  selectIsFilmsLoading,
  selectIsPromoLoading,
  selectPromo
} from '../../store/app-reducer/selectors.ts';

export const MainPage = () => {
  const promo = useSelector(selectPromo);
  const filteredFilms = useSelector(selectFilteredByGenreFilms);
  const isFilmsLoading = useSelector(selectIsFilmsLoading);
  const isPromoLoading = useSelector(selectIsPromoLoading);

  return (
    <React.Fragment>
      <FilmCard film={promo} isLoading={isPromoLoading}/>

      <div className="page-content">
        <Catalog films={filteredFilms} isLoading={isFilmsLoading}/>
        <Footer/>
      </div>
    </React.Fragment>
  );
};
