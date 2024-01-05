import * as React from 'react';
import {GENRE_LIST} from '../../../mocs/genres.ts';
import {GenreItem} from './genre-item.tsx';

export const GenreList: React.FC = () => (
  <ul className="catalog__genres-list">
    {GENRE_LIST.map((genre) => <GenreItem genre={genre} key={genre.id}/>)}
  </ul>
);
