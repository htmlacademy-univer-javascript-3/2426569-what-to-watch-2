import * as React from 'react';
import {Footer} from '../components/footer/footer.tsx';
import {Catalog} from '../components/catalog/catalog.tsx';
import {FilmCard} from '../components/film-card/film-card.tsx';
import {FilmInfo} from '../mocs/filmInfo.ts';

type Props = {
  filmsData: FilmInfo[];
};

export const MainPage = ({filmsData}: Props) => (
  <React.Fragment>
    <FilmCard film={filmsData[0]}/>

    <div className="page-content">
      <Catalog filmsData={filmsData}/>
      <Footer/>
    </div>
  </React.Fragment>
);
