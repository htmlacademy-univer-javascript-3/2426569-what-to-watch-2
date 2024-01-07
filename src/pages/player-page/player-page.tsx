import {Navigate, useParams} from 'react-router-dom';
import {RoutesLinks} from '../../routes/route-links.ts';
import {Player} from '../../components/player/player.tsx';
import {useSelector} from 'react-redux';
import {selectFilmById} from '../../store/app-reducer/selectors.ts';

export const PlayerPage = () => {
  const {id} = useParams();
  const film = useSelector(selectFilmById(id));

  if (!film) {
    return (<Navigate to={RoutesLinks.NotFound}/>);
  }
  return (
    <Player film={film}/>
  );
};
