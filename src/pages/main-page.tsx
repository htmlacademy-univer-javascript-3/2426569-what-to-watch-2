import * as React from 'react';
import {Footer} from '../components/footer/footer.tsx';
import {Catalog} from '../components/catalog/catalog.tsx';
import {FilmCard} from '../components/film-card/film-card.tsx';
import {selectFilms, selectFilteredByGenreFilms} from '../store/reducer.ts';
import {useSelector} from 'react-redux';

export const MainPage = () => {
  const films = useSelector(selectFilms);
  const filteredFilms = useSelector(selectFilteredByGenreFilms);

  return (
    <React.Fragment>
      <FilmCard film={films[0]}/>

      <div className="page-content">
        <Catalog films={filteredFilms}/>
        <Footer/>
      </div>
    </React.Fragment>
  );
};
