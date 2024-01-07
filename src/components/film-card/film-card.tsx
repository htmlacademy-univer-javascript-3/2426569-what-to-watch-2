import {Header} from '../header';
import {RoutesLinks} from '../../routes/route-links.ts';
import {ICONS} from '../icon/icons.ts';
import {FilmCardLinkButton} from '../film-card-buttons/film-card-link-button.tsx';
import {Icon} from '../icon/icon.tsx';
import {FilmShortInfo} from '../../types/film-details-info.ts';
import {SpinnerWrapper} from '../spinner/spinner-wrapper.tsx';
import filmNotFoundGif from '../../../public/img/movie-not-found.gif';

interface FilmCardProps {
  film?: FilmShortInfo;
  isLoading: boolean;
}

const COUNT_FAVORITE = 9;

export function FilmCard({film, isLoading}: FilmCardProps) {
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

                  <div className="film-card__buttons">
                    <FilmCardLinkButton
                      title={'Play'}
                      classNames={'btn--play'}
                      icon={<Icon {...ICONS.PLAY_START}/>}
                      toLink={RoutesLinks.Player.replace(':id', film.id)}
                    />
                    <FilmCardLinkButton
                      title={'My list'}
                      classNames={'btn--list'}
                      icon={<Icon {...ICONS.IN_LIST}/>}
                      toLink={RoutesLinks.MyList}
                    >
                      <span className="film-card__count">{COUNT_FAVORITE}</span>
                    </FilmCardLinkButton>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

      </SpinnerWrapper>
    </section>
  );
}
