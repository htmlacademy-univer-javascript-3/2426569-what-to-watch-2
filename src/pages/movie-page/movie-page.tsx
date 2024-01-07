import {Fragment} from 'react';
import {Footer} from '../../components/footer/footer.tsx';
import {Header} from '../../components/header/header.tsx';
import {Navigate, useParams} from 'react-router-dom';
import {RoutesLinks} from '../../routes/route-links.ts';
import {FilmCardLinkButton} from '../../components/film-card-buttons/film-card-link-button.tsx';
import {Icon} from '../../components/icon/icon.tsx';
import {ICONS} from '../../components/icon/icons.ts';
import {FilmDescription} from '../../components/film-descrtipion/film-description.tsx';
import REVIEW_LIST from '../../mocs/review.ts';
import {FilmList} from '../../components/catalog/film-list/film-list.tsx';
import {useSelector} from 'react-redux';

import {selectFilmById, selectSimilarFilms} from '../../store/app-reducer/selectors.ts';

const COUNT_FAVORITE = 9;

export const MoviePage = () => {
  const {id} = useParams();
  const film = useSelector(selectFilmById(id));
  const similarFilms = useSelector(selectSimilarFilms(id));

  if (!film) {
    return (<Navigate to={RoutesLinks.NotFound}/>);
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
                  icon={<Icon {...ICONS.IN_LIST}/>}
                  toLink={RoutesLinks.MyList}
                >
                  <span className="film-card__count">{COUNT_FAVORITE}</span>
                </FilmCardLinkButton>
                <FilmCardLinkButton
                  toLink={RoutesLinks.AddReview.replace(':id', film.id)}
                  title={'Add review'}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="film-card__wrap film-card__translate-top">
          <div className="film-card__info">
            <div className="film-card__poster film-card__poster--big">
              <img src={film.posterImage} alt={film.name} width="218" height="327"/>
            </div>

            <FilmDescription film={film} reviews={REVIEW_LIST}/>
          </div>
        </div>
      </section>

      <div className="page-content">
        {
          similarFilms.length > 0 && (
            <section className="catalog catalog--like-this">
              <h2 className="catalog__title">More like this</h2>

              <FilmList filmsData={similarFilms} maxLength={4}/>
            </section>
          )
        }
        <Footer/>
      </div>
    </Fragment>
  );
};
