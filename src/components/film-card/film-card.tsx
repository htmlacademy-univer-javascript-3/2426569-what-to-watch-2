import {Header} from '../header';
import {RoutesLinks} from '../../routes/route-links';
import {ICONS} from '../icon/icons';
import {FilmCardLinkButton} from '../film-card-buttons/film-card-link-button';
import {Icon} from '../icon/icon';
import {FilmShortInfo} from '../../types/film-details-info';
import {SpinnerWrapper} from '../spinner/spinner-wrapper';
import filmNotFoundGif from '../../../public/img/movie-not-found.gif';
import {useSelector} from 'react-redux';
import {selectFavoriteCount} from '../../store/user-reducer/selectors';

interface FilmCardProps {
  film?: FilmShortInfo;
  isLoading: boolean;
}

export function FilmCard({film, isLoading}: FilmCardProps) {
  const favoriteCount = useSelector(selectFavoriteCount);
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
                      icon={film.isFavorite ? <Icon {...ICONS.IN_LIST}/> : <Icon {...ICONS.ADD_LIST}/>}
                      toLink={RoutesLinks.MyList}
                    >
                      <span className="film-card__count">{favoriteCount}</span>
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

export default FilmCard;
