import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {RoutesLinks} from './routes/route-links';
import {MainPage} from './pages/main-page/main-page';
import {SignIn} from './pages/sign-in/sign-in';
import PrivateRoute from './routes/private-route';
import {MyListPage} from './pages/my-list-page/my-list-page';
import {MoviePage} from './pages/movie-page/movie-page';

import {PlayerPage} from './pages/player-page/player-page';
import {NotFoundPage} from './pages/not-found-page/not-found-page';

import ScrollToTop from './components/scroll-to-top/scroll-to-top';
import AddReviewPage from './pages/add-review/add-review';

export function App() {
  return (
    <BrowserRouter>
      <ScrollToTop/>
      <Routes>
        <Route path={RoutesLinks.Main} element={<MainPage/>}/>
        <Route path={RoutesLinks.SingIn} element={<SignIn/>}/>
        <Route path={RoutesLinks.MyList} element={<PrivateRoute><MyListPage/></PrivateRoute>}/>
        <Route path={RoutesLinks.Films}>
          <Route path={RoutesLinks.Film} element={<MoviePage/>}/>
          <Route path={RoutesLinks.AddReview} element={<PrivateRoute><AddReviewPage/></PrivateRoute>}/>
        </Route>
        <Route path={RoutesLinks.Player} element={<PlayerPage/>}/>
        <Route path={RoutesLinks.NotFound} element={<NotFoundPage/>}/>
      </Routes>
    </BrowserRouter>
  );
}
