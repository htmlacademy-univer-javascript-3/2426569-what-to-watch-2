import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {ROUTES_LINKS} from './routes/route-links.ts';
import {MainPage} from './pages/main-page.tsx';
import {SignIn} from './pages/sign-in.tsx';
import PrivateRoute from './routes/private-route.tsx';
import {MyListPage} from './pages/my-list-page.tsx';
import {MoviePage} from './pages/movie-page.tsx';
import {AddReviewPage} from './pages/add-review.tsx';
import {PlayerPage} from './pages/player-page.tsx';
import {NotFoundPage} from './pages/not-found-page.tsx';

import ScrollToTop from './components/scroll-to-top/ScrollToTop.tsx';

type Props = {
  isAuth: boolean;
};

export function App({isAuth}: Props) {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path={ROUTES_LINKS.MAIN} element={<MainPage/>}/>
        <Route path={ROUTES_LINKS.SING_IN} element={<SignIn/>}/>
        <Route path={ROUTES_LINKS.MY_LIST} element={<PrivateRoute hasAccess={isAuth}><MyListPage/></PrivateRoute>}/>
        <Route path={ROUTES_LINKS.FILMS}>
          <Route path={ROUTES_LINKS.FILM} element={<MoviePage/>}/>
          <Route path={ROUTES_LINKS.ADD_REVIEW} element={<PrivateRoute hasAccess={isAuth}><AddReviewPage/></PrivateRoute>}/>
        </Route>
        <Route path={ROUTES_LINKS.PLAYER} element={<PlayerPage/>}/>
        <Route path={ROUTES_LINKS.NOT_FOUND} element={<NotFoundPage/>}/>
      </Routes>
    </BrowserRouter>
  );
}
