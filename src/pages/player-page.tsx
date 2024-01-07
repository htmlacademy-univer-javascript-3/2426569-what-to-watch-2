import {Navigate, useParams} from 'react-router-dom';
import {ROUTES_LINKS} from '../routes/route-links.ts';
import {Player} from '../components/player/player.tsx';
import {selectFilmById} from '../store/reducer.ts';
import {useSelector} from 'react-redux';

export const PlayerPage = () => {
  const {id} = useParams();
  const film = useSelector(selectFilmById(id));

  if (!film) {
    return (<Navigate to={ROUTES_LINKS.NOT_FOUND}/>);
  }
  return (
    <Player film={film}/>
  );
};
