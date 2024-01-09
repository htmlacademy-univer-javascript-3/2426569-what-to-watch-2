import {Fragment, memo, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';
import {FilmList} from '../../components/catalog/film-list/film-list';
import {FilmCardButtons} from '../../components/film-card-buttons/film-card-buttons.tsx';
import {FilmDescription} from '../../components/film-descrtipion/film-description';
import {Footer} from '../../components/footer/footer';
import {Header} from '../../components/header';
import {Spinner, SpinnerWrapper} from '../../components/spinner/spinner-wrapper';
import {MAX_SIMILAR_FILMS_IN_PAGE} from '../../consts.ts';
import {useAppDispatch} from '../../hooks/store';
import {fetchFilm, fetchReviews, fetchSimilar} from '../../store/api-action';
import {
  selectFilm,
  selectIsFilmLoading,
  selectIsSimilarFilmsLoading,
  selectReviews,
  selectSimilarFilms
} from '../../store/film-reducer/selectors';
import {NotFoundPage} from '../not-found-page/not-found-page';

export const MoviePageComponent = () => {
  const {id = ''} = useParams();
  const film = useSelector(selectFilm);
  const isFilmLoading = useSelector(selectIsFilmLoading);
  const similarFilms = useSelector(selectSimilarFilms);
  const isSimilarFilmsLoading = useSelector(selectIsSimilarFilmsLoading);
  const reviews = useSelector(selectReviews);
  const dispatch = useAppDispatch();

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      dispatch(fetchFilm(id));
      dispatch(fetchSimilar(id));
      dispatch(fetchReviews(id));
    }

    return () => {
      isMounted = false;
    };
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

              <FilmCardButtons filmId={film.id} isFavorite={film.isFavorite} withReview/>
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

                <FilmList filmsData={similarFilms} maxLength={MAX_SIMILAR_FILMS_IN_PAGE}/>
              </section>
            )
          }
        </SpinnerWrapper>
        <Footer/>
      </div>
    </Fragment>
  );
};

export const MoviePage = memo(MoviePageComponent);
