import {FilmProps} from '../../../data/filmProps.ts';

interface SmallFilmCardProps {
  film: FilmProps;
}

const CARD_WIDTH = '280';
const CARD_HEIGHT = '175';

export function SmallFilmCard(props: SmallFilmCardProps) {
  const {alt, imageSrc: imageSrc, title, link} = props.film;
  return (
    <article className="small-film-card catalog__films-card">
      <div className="small-film-card__image">
        <img src={imageSrc} alt={alt} width={CARD_WIDTH} height={CARD_HEIGHT}/>
      </div>
      <h3 className="small-film-card__title">
        <a className="small-film-card__link" href={link}>{title}</a>
      </h3>
    </article>
  );
}
