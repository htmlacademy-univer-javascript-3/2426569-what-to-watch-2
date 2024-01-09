import {memo} from 'react';
import * as React from 'react';
import {useSelector} from 'react-redux';
import {Catalog} from '../../components/catalog/catalog';
import FilmCard from '../../components/film-card/film-card';
import {Footer} from '../../components/footer/footer';
import {
  selectFilteredByGenreFilms,
  selectIsFilmsLoading,
  selectIsPromoLoading,
  selectPromo
} from '../../store/app-reducer/selectors';


const MainPageComponent = () => {
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

const MainPage = memo(MainPageComponent);
export default MainPage;
