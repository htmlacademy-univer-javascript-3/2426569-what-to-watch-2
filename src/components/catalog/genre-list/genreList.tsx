import * as React from 'react';
import {GENRE_LIST} from '../../../data/genreData.ts';
import {GenreItem} from './genreItem.tsx';

export const GenreList: React.FC = () => (
  <ul className="catalog__genres-list">
    {GENRE_LIST.map((genre) => <GenreItem genre={genre} key={genre.id}/>)}
  </ul>
);
