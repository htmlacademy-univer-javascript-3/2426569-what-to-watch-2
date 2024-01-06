import {Link} from 'react-router-dom';
import {ROUTES_LINKS} from '../../../routes/route-links.ts';
import {useCallback} from 'react';
import {SmallPreviewPlayer} from '../../small-preview-player/small-preview-player.tsx';
import {FilmInfo} from '../../../types/filmInfo.ts';

interface SmallFilmCardProps {
  film: FilmInfo;
  isActive: boolean;
  onMouseEnter: (id: string) => void;
  onMouseLeave: () => void;
}

const CARD_WIDTH = '280';
const CARD_HEIGHT = '175';

export function SmallFilmCard({film, isActive, onMouseEnter, onMouseLeave}: SmallFilmCardProps) {
  const {name, id} = film;

  const handleMouseEnter = useCallback(() => {
    onMouseEnter(id);
  }, [id, onMouseEnter]);

  return (
    <article
      className="small-film-card catalog__films-card"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={onMouseLeave}
      data-active={isActive}
    >
      <SmallPreviewPlayer {...film} width={CARD_WIDTH} height={CARD_HEIGHT}/>
      <h3 className="small-film-card__title">
        <Link className="small-film-card__link" to={ROUTES_LINKS.FILM.replace(':id', id)}>{name}</Link>
      </h3>
    </article>
  );
}
