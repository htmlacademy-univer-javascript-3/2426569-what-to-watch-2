import {useEffect} from 'react';
import {useSelector} from 'react-redux';
import {Catalog} from '../../components/catalog/catalog';
import {Footer} from '../../components/footer/footer';
import {Header} from '../../components/header';
import {useAppDispatch} from '../../hooks/store.ts';
import {fetchFavoriteFilms} from '../../store/api-action.ts';

import {selectIsFilmsLoading} from '../../store/app-reducer/selectors';
import {selectFavoriteCount, selectFavoriteFilms} from '../../store/user-reducer/selectors';

export const MyListPage = () => {
  const films = useSelector(selectFavoriteFilms);
  const favoriteCount = useSelector(selectFavoriteCount);
  const isLoading = useSelector(selectIsFilmsLoading);
  const dispatch = useAppDispatch();

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      dispatch(fetchFavoriteFilms());
    }

    return () => {
      isMounted = false;
    };
  }, [dispatch]);

  return (
    <div className="user-page">
      <Header
        classNames={'user-page__head'}
        pageTitle={
          <h1 className="page-title user-page__title">
            My list <span className="user-page__film-count">{favoriteCount}</span>
          </h1>
        }
      />

      <Catalog films={films} withoutGenres withoutShowMore isLoading={isLoading}/>
      <Footer/>
    </div>
  );
};
