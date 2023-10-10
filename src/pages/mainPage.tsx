import * as React from 'react';
import {Footer} from '../components/footer/footer.tsx';
import {Catalog} from '../components/catalog/catalog.tsx';
import {FilmCard} from '../components/film-card/filmCard.tsx';

const film: FilmCard = {
  bgImageSrc: 'img/bg-the-grand-budapest-hotel.jpg',
  bgAlt: 'The Grand Budapest Hotel',
  posterImageSrc: 'img/the-grand-budapest-hotel-poster.jpg',
  posterAlt: 'The Grand Budapest Hotel poster',
  title: 'The Grand Budapest Hotel',
  genre: 'Drama',
  year: '2014',
};

export const MainPage = () => (
  <React.Fragment>
    <FilmCard film={film}/>

    <div className="page-content">
      <Catalog/>
      <Footer/>
    </div>
  </React.Fragment>
);
