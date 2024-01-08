import {memo} from 'react';
import filmNotFoundGif from '../../../public/img/movie-not-found.gif';
import {FilmShortInfo} from '../../types/film-details-info';
import {FilmCardButtons} from '../film-card-buttons/film-card-buttons.tsx';
import {Header} from '../header';
import {SpinnerWrapper} from '../spinner/spinner-wrapper';

interface FilmCardProps {
  film?: FilmShortInfo;
  isLoading: boolean;
}

function FilmCardComponent({film, isLoading}: FilmCardProps) {
  return (
    <section className="film-card">
      <Header classNames={'film-card__head'}/>

      <SpinnerWrapper isLoading={isLoading}>
        {!film && (
          <div>
            <img src={filmNotFoundGif} alt={'Кина не будет'}></img>
          </div>
        )}
        {film && (
          <>
            <div className="film-card__bg">
              <img src={film.backgroundImage} alt={film.name}/>
            </div>

            <div className="film-card__wrap">
              <div className="film-card__info">
                <div className="film-card__poster">
                  <img src={film.posterImage} alt={film.name} width="218" height="327"/>
                </div>

                <div className="film-card__desc">
                  <h2 className="film-card__title">{film.name}</h2>
                  <p className="film-card__meta">
                    <span className="film-card__genre">{film.genre}</span>
                    <span className="film-card__year">{film.released}</span>
                  </p>

                  <FilmCardButtons filmId={film.id} isFavorite={film.isFavorite}/>
                </div>
              </div>
            </div>
          </>
        )}

      </SpinnerWrapper>
    </section>
  );
}

const FilmCard = memo(FilmCardComponent);

export default FilmCard;
