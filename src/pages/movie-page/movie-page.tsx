import {Fragment, useEffect} from 'react';
import {Footer} from '../../components/footer/footer';
import {Header} from '../../components/header/header';
import {useParams} from 'react-router-dom';
import {RoutesLinks} from '../../routes/route-links';
import {FilmCardLinkButton} from '../../components/film-card-buttons/film-card-link-button';
import {Icon} from '../../components/icon/icon';
import {ICONS} from '../../components/icon/icons';
import {FilmDescription} from '../../components/film-descrtipion/film-description';
import {FilmList} from '../../components/catalog/film-list/film-list';
import {useSelector} from 'react-redux';
import {
  selectFilm,
  selectIsFilmLoading,
  selectIsSimilarFilmsLoading,
  selectReviews,
  selectSimilarFilms
} from '../../store/film-reducer/selectors';
import {useAppDispatch} from '../../hooks/store';
import {fetchFilm, fetchReviews, fetchSimilar} from '../../store/api-action';
import {Spinner, SpinnerWrapper} from '../../components/spinner/spinner-wrapper';
import {NotFoundPage} from '../not-found-page/not-found-page';
import {selectAuthStatus, selectFavoriteCount} from '../../store/user-reducer/selectors';
import {AuthStatus} from '../../types/auth-status';

export const MoviePage = () => {
  const {id = ''} = useParams();
  const film = useSelector(selectFilm);
  const isFilmLoading = useSelector(selectIsFilmLoading);
  const similarFilms = useSelector(selectSimilarFilms);
  const isSimilarFilmsLoading = useSelector(selectIsSimilarFilmsLoading);
  const reviews = useSelector(selectReviews);
  const isAuth = useSelector(selectAuthStatus) === AuthStatus.Auth;
  const favoriteCount = useSelector(selectFavoriteCount);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchFilm(id));
    dispatch(fetchSimilar(id));
    dispatch(fetchReviews(id));
  }, [dispatch, id]);

  if (isFilmLoading) {
    return <Spinner isFullPage/>;
  }

  if (!id || !film) {
    return (<NotFoundPage/>);
  }

  return (
    <Fragment>
      <section className="film-card film-card--full">
        <div className="film-card__hero">
          <Header/>

          <div className="film-card__bg">
            <img src={film.backgroundImage} alt={film.name}/>
          </div>

          <div className="film-card__wrap">
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
                {isAuth && (
                  <FilmCardLinkButton
                    toLink={RoutesLinks.AddReview.replace(':id', film.id)}
                    title={'Add review'}
                  />
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="film-card__wrap film-card__translate-top">
          <div className="film-card__info">
            <div className="film-card__poster film-card__poster--big">
              <img src={film.posterImage} alt={film.name} width="218" height="327"/>
            </div>
            <FilmDescription film={film} reviews={reviews}/>
          </div>
        </div>
      </section>

      <div className="page-content">
        <SpinnerWrapper isLoading={isSimilarFilmsLoading}>
          {
            similarFilms.length > 0 && (
              <section className="catalog catalog--like-this">
                <h2 className="catalog__title">More like this</h2>

                <FilmList filmsData={similarFilms} maxLength={4}/>
              </section>
            )
          }
        </SpinnerWrapper>
        <Footer/>
      </div>
    </Fragment>
  );
};
