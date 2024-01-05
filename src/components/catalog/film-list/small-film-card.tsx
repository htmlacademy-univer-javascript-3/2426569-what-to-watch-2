import {FilmInfo} from '../../../mocs/filmInfo.ts';
import {Link} from 'react-router-dom';
import {ROUTES_LINKS} from '../../../routes/consts.ts';
import {useCallback} from 'react';

interface SmallFilmCardProps {
  film: FilmInfo;
  isActive: boolean;
  onMouseEnter: (id: string) => void;
  onMouseLeave: () => void;
}

const CARD_WIDTH = '280';
const CARD_HEIGHT = '175';

export function SmallFilmCard({film, isActive, onMouseEnter, onMouseLeave}: SmallFilmCardProps) {
  const {backgroundImage, name, id} = film;

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
      <div className="small-film-card__image">
        <img src={backgroundImage} alt={name} width={CARD_WIDTH} height={CARD_HEIGHT}/>
      </div>
      <h3 className="small-film-card__title">
        <Link className="small-film-card__link" to={ROUTES_LINKS.FILM.replace(':id', id)}>{name}</Link>
      </h3>
    </article>
  );
}
