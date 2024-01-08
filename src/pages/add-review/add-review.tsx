import {Breadcrumbs} from '../../components/breadcrumbs/breadcrumbs';
import {Header} from '../../components/header';
import {useParams} from 'react-router-dom';
import {ReviewForm} from '../../components/review-form/review-form';
import {useSelector} from 'react-redux';

import {selectFilm, selectIsFilmLoading} from '../../store/film-reducer/selectors';
import {useAppDispatch} from '../../hooks/store';
import {memo, useEffect} from 'react';
import {fetchFilm} from '../../store/api-action';
import {Spinner} from '../../components/spinner/spinner-wrapper';
import {NotFoundPage} from '../not-found-page/not-found-page';

const AddReviewPage = function () {
  const {id = ''} = useParams();
  const film = useSelector(selectFilm);
  const isFilmLoading = useSelector(selectIsFilmLoading);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchFilm(id));
  }, [dispatch, id]);

  if (isFilmLoading) {
    return <Spinner isFullPage/>;
  }

  if (!id || !film) {
    return (<NotFoundPage/>);
  }

  const {name, backgroundImage, posterImage} = film;
  return (
    <section className="film-card film-card--full">
      <div className="film-card__header">
        <div className="film-card__bg">
          <img src={backgroundImage} alt={name}/>
        </div>

        <Header classNames={'film-card__head'} breadcrumbs={<Breadcrumbs id={film.id} title={name}/>}/>

        <div className="film-card__poster film-card__poster--small">
          <img src={posterImage} alt={name} width="218" height="327"/>
        </div>
      </div>

      <div className="add-review">
        <ReviewForm filmId={film.id}/>
      </div>
    </section>
  );
};

export default memo(AddReviewPage);
