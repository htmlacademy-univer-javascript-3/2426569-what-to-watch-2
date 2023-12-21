import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {ROUTES_LINKS} from './routes/consts.ts';
import {MainPage} from './pages/main-page.tsx';
import {SignIn} from './pages/sign-in.tsx';
import PrivateRoute from './routes/private-route.tsx';
import {MyListPage} from './pages/my-list-page.tsx';
import {MoviePage} from './pages/movie-page.tsx';
import {AddReviewPage} from './pages/add-review.tsx';
import {PlayerPage} from './pages/player-page.tsx';
import {NotFoundPage} from './pages/not-found-page.tsx';
import {FilmInfo} from './mocs/filmInfo.ts';

type Props = {
  isAuth: boolean;
  filmsData: FilmInfo[];
};

export function App({filmsData, isAuth}: Props) {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTES_LINKS.MAIN} element={<MainPage filmsData={filmsData}/>}/>
        <Route path={ROUTES_LINKS.SING_IN} element={<SignIn/>}/>
        <Route path={ROUTES_LINKS.MY_LIST} element={<PrivateRoute hasAccess={isAuth}><MyListPage filmsData={filmsData}/></PrivateRoute>}/>
        <Route path={ROUTES_LINKS.FILMS}>
          <Route path={ROUTES_LINKS.FILM} element={<MoviePage filmsData={filmsData}/>}/>
          <Route path={ROUTES_LINKS.ADD_REVIEW} element={<PrivateRoute hasAccess={isAuth}><AddReviewPage filmsData={filmsData}/></PrivateRoute>}/>
        </Route>
        <Route path={ROUTES_LINKS.PLAYER} element={<PlayerPage filmsData={filmsData}/>}/>
        <Route path={ROUTES_LINKS.NOT_FOUND} element={<NotFoundPage/>}/>
      </Routes>
    </BrowserRouter>
  );
}
