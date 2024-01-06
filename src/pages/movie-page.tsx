import {Fragment} from 'react';
import {Footer} from '../components/footer/footer.tsx';
import {Header} from '../components/header/header.tsx';
import {Navigate, useParams} from 'react-router-dom';
import {ROUTES_LINKS} from '../routes/route-links.ts';
import {FilmCardLinkButton} from '../components/film-card-buttons/film-card-link-button.tsx';
import {Icon} from '../components/icon/icon.tsx';
import {ICONS} from '../components/icon/icons.ts';
import {FilmDescription} from '../components/film-descrtipion/film-description.tsx';
import REVIEW_LIST from '../mocs/review.ts';
import {FilmList} from '../components/catalog/film-list/film-list.tsx';
import {useSelector} from 'react-redux';
import {selectFilms} from '../store/reducer.ts';

const COUNT_FAVORITE = 9;

export const MoviePage = () => {
  const {id} = useParams();
  const films = useSelector(selectFilms);
  const film = films.find((item) => item.id === id);

  if (!film) {
    return (<Navigate to={ROUTES_LINKS.NOT_FOUND}/>);
  }

  const genre = film.genre;
  const filteredFilms = films.filter((f) => f.genre === genre && f.id !== id);

  return (

    <Fragment>
      <section className="film-card film-card--full">
        <div className="film-card__hero">
          <div className="film-card__bg">
            <img src={film.backgroundImage} alt={film.name}/>
          </div>

          <h1 className="visually-hidden">WTW</h1>

          <Header/>

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
                  toLink={ROUTES_LINKS.PLAYER.replace(':id', film.id)}
                />
                <FilmCardLinkButton
                  title={'My list'}
                  classNames={'btn--list'}
                  icon={<Icon {...ICONS.IN_LIST}/>}
                  toLink={ROUTES_LINKS.MY_LIST}
                >
                  <span className="film-card__count">{COUNT_FAVORITE}</span>
                </FilmCardLinkButton>
                <FilmCardLinkButton
                  toLink={ROUTES_LINKS.ADD_REVIEW.replace(':id', film.id)}
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
          filteredFilms.length > 0 && (
            <section className="catalog catalog--like-this">
              <h2 className="catalog__title">More like this</h2>

              <FilmList filmsData={filteredFilms} maxLength={4}/>
            </section>
          )
        }
        <Footer/>
      </div>
    </Fragment>
  );
};
