import {Footer} from '../components/footer/footer.tsx';
import {Header} from '../components/header/header.tsx';
import {Catalog} from '../components/catalog/catalog.tsx';
import {useSelector} from 'react-redux';
import {selectMyFilms} from '../store/reducer.ts';

export const MyListPage = () => {
  const films = useSelector(selectMyFilms);

  return (
    <div className="user-page">
      <Header
        classNames={'user-page__head'}
        pageTitle={
          <h1 className="page-title user-page__title">My list <span className="user-page__film-count">9</span></h1>
        }
      />

      <Catalog films={films} withoutGenres withoutShowMore/>
      <Footer/>
    </div>
  );
};
