import {Footer} from '../components/footer/footer.tsx';
import {Header} from '../components/header/header.tsx';
import {FilmInfo} from '../mocs/filmInfo.ts';
import {Catalog} from '../components/catalog/catalog.tsx';

interface Props {
  filmsData: FilmInfo[];
}

export const MyListPage = ({filmsData}: Props) => (
  <div className="user-page">
    <Header
      classNames={'user-page__head'}
      pageTitle={
        <h1 className="page-title user-page__title">My list <span className="user-page__film-count">9</span></h1>
      }
    />

    <Catalog filmsData={filmsData} withoutGenres withoutShowMore/>
    <Footer/>
  </div>
);
