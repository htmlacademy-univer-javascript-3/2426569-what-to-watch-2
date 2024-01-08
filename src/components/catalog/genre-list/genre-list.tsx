import * as React from 'react';
import {memo, useMemo} from 'react';
import {useSelector} from 'react-redux';
import {DEFAULT_GENRE} from '../../../consts';
import {useAppDispatch} from '../../../hooks/store.ts';
import {changeGenre} from '../../../store/actions';
import {selectFilms, selectGenre} from '../../../store/app-reducer/selectors';
import {GenreItem} from './genre-item';

const GenreListComponent: React.FC = () => {
  const dispatch = useAppDispatch();
  const selectedGenre = useSelector(selectGenre);
  const films = useSelector(selectFilms);
  const genreList = useMemo(() => [DEFAULT_GENRE, ...new Set(films.map((film) => film.genre))], [films]);

  return (
    <ul className="catalog__genres-list" data-testid="catalog__genres-list">
      {
        genreList.map((genre) => {
          const handleGenreClick = () => {
            dispatch(changeGenre(genre));
          };

          return (
            <GenreItem
              genre={genre}
              isActive={genre === selectedGenre}
              onClick={handleGenreClick}
              key={genre}
            />
          );
        })
      }
    </ul>
  );
};

export const GenreList = memo(GenreListComponent);
