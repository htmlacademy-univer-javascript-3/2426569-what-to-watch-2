import {FILM_LIST} from '../../../data/filmProps.ts';
import {SmallFilmCard} from './smallFilmCard.tsx';
import * as React from 'react';

export const FilmList: React.FC = () => (
  <div className="catalog__films-list">
    {FILM_LIST.map((film) => <SmallFilmCard film={film} key={film.id}/>)}
  </div>
);
