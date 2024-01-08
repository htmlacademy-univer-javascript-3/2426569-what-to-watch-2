import {memo, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';
import {Breadcrumbs} from '../../components/breadcrumbs/breadcrumbs';
import {Header} from '../../components/header';
import {ReviewForm} from '../../components/review-form/review-form';
import {Spinner} from '../../components/spinner/spinner-wrapper';
import {useAppDispatch} from '../../hooks/store';
import {fetchFilm} from '../../store/api-action';

import {selectFilm, selectIsFilmLoading} from '../../store/film-reducer/selectors';
import {NotFoundPage} from '../not-found-page/not-found-page';

const AddReviewPage = function () {
  const {id = ''} = useParams();
  const film = useSelector(selectFilm);
  const isFilmLoading = useSelector(selectIsFilmLoading);
  const dispatch = useAppDispatch();

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      dispatch(fetchFilm(id));
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
