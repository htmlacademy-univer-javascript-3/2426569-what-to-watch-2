import * as React from 'react';
import {GenreItem} from './genre-item.tsx';
import {changeGenre, selectFilms, selectGenre} from '../../../store/reducer.ts';
import {useDispatch, useSelector} from 'react-redux';
import {useMemo} from 'react';
import {DEFAULT_GENRE} from '../../../consts.ts';

export const GenreList: React.FC = () => {
  const dispatch = useDispatch();
  const selectedGenre = useSelector(selectGenre);
  const films = useSelector(selectFilms);

  const genreList = useMemo(() => [DEFAULT_GENRE, ...new Set(films.map((film) => film.genre))], [films]);

  const handleGenreClick = (genre: string) => {
    dispatch(changeGenre(genre));
  };

  return (
    <ul className="catalog__genres-list">
      {
        genreList.map((genre) => {
          const onClick = () => {
            handleGenreClick(genre);
          };

          return (
            <GenreItem
              genre={genre}
              isActive={genre === selectedGenre}
              onClick={onClick}
              key={genre}
            />
          );
        })
      }
    </ul>
  );
};
