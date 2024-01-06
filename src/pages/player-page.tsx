import {FilmInfo} from '../mocs/filmInfo.ts';
import {Navigate, useParams} from 'react-router-dom';
import {ROUTES_LINKS} from '../routes/consts.ts';
import {Player} from '../components/player/player.tsx';

type Props = {
  filmsData: FilmInfo[];
}

export const PlayerPage = ({filmsData}: Props) => {
  const {id} = useParams();
  const film = filmsData.find((item) => item.id === id);

  if (!film) {
    return (<Navigate to={ROUTES_LINKS.NOT_FOUND}/>);
  }
  return (
    <Player film={film}/>
  );
};
