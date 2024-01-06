import {Navigate, useParams} from 'react-router-dom';
import {ROUTES_LINKS} from '../routes/route-links.ts';
import {Player} from '../components/player/player.tsx';
import {selectFilms} from '../store/reducer.ts';
import {useSelector} from 'react-redux';

export const PlayerPage = () => {
  const {id} = useParams();
  const films = useSelector(selectFilms);
  const film = films.find((item) => item.id === id);

  if (!film) {
    return (<Navigate to={ROUTES_LINKS.NOT_FOUND}/>);
  }
  return (
    <Player film={film}/>
  );
};
