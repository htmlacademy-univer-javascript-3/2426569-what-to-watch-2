import {useParams} from 'react-router-dom';
import {Player} from '../../components/player/player';
import {useSelector} from 'react-redux';

import {selectFilm, selectIsFilmLoading} from '../../store/film-reducer/selectors';
import {useEffect} from 'react';
import {fetchFilm} from '../../store/api-action';
import {Spinner} from '../../components/spinner/spinner-wrapper';
import {NotFoundPage} from '../not-found-page/not-found-page';
import {useAppDispatch} from '../../hooks/store';

export const PlayerPage = () => {
  const {id = ''} = useParams();
  const film = useSelector(selectFilm);
  const isFilmLoading = useSelector(selectIsFilmLoading);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchFilm(id));
  }, [dispatch, id]);

  if (isFilmLoading) {
    return <Spinner isFullPage/>;
  }

  if (!id || !film) {
    return (<NotFoundPage/>);
  }

  return <Player film={film}/>;
};
