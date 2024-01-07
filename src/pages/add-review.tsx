import {Breadcrumbs} from '../components/breadcrumbs/breadcrumbs.tsx';
import {Header} from '../components/header/header.tsx';
import {Navigate, useParams} from 'react-router-dom';
import {ReviewForm} from '../components/review-form/review-form.tsx';
import {ROUTES_LINKS} from '../routes/route-links.ts';
import {selectFilmById} from '../store/reducer.ts';
import {useSelector} from 'react-redux';

export const AddReviewPage = function () {
  const {id} = useParams();
  const film = useSelector(selectFilmById(id));

  if (!film) {
    return (<Navigate to={ROUTES_LINKS.NOT_FOUND}/>);
  }

  const {name, backgroundImage, posterImage} = film;
  return (
    <section className="film-card film-card--full">
      <div className="film-card__header">
        <div className="film-card__bg">
          <img src={backgroundImage} alt={name}/>
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <Header classNames={'film-card__head'} breadcrumbs={<Breadcrumbs id={film.id} title={name}/>}/>

        <div className="film-card__poster film-card__poster--small">
          <img src={posterImage} alt={name} width="218" height="327"/>
        </div>
      </div>

      <div className="add-review">
        <ReviewForm/>
      </div>
    </section>
  );
};

