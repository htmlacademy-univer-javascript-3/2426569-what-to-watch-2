import {Link} from 'react-router-dom';
import {RoutesLinks} from '../../../routes/route-links';
import {memo, useCallback} from 'react';
import {SmallPreviewPlayer} from '../../small-preview-player/small-preview-player';
import {FilmInfo} from '../../../types/film-info';

interface SmallFilmCardProps {
  film: FilmInfo;
  isActive: boolean;
  onMouseEnter: (id: string) => void;
  onMouseLeave: () => void;
}

const CARD_WIDTH = '280';
const CARD_HEIGHT = '175';

function SmallFilmCardComponent({film, isActive, onMouseEnter, onMouseLeave}: SmallFilmCardProps) {
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
      data-testid="small-film-card"
    >
      <SmallPreviewPlayer {...film} width={CARD_WIDTH} height={CARD_HEIGHT}/>
      <h3 className="small-film-card__title">
        <Link className="small-film-card__link" to={RoutesLinks.Film.replace(':id', id)}>{name}</Link>
      </h3>
    </article>
  );
}

export const SmallFilmCard = memo(SmallFilmCardComponent);
