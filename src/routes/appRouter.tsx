import {FC} from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {ROUTES_LINKS} from './consts.ts';
import {MainPage} from '../pages/mainPage.tsx';
import {SignIn} from '../pages/signIn.tsx';
import PrivateRoute from './privateRoute.tsx';
import {MyList} from '../pages/myList.tsx';
import {MoviePage} from '../pages/moviePage.tsx';
import {PlayerPage} from '../pages/playerPage.tsx';
import {AddReviewPage} from '../pages/addReview.tsx';
import {NotFoundPage} from '../pages/notFoundPage.tsx';


export const AppRouter: FC = () => (
  <BrowserRouter>
    <Routes>
      <Route path={ROUTES_LINKS.MAIN} element={<MainPage/>}/>
      <Route path={ROUTES_LINKS.SING_IN} element={<SignIn/>}/>
      <Route path={ROUTES_LINKS.MY_LIST} element={<PrivateRoute><MyList/></PrivateRoute>}/>
      <Route path={ROUTES_LINKS.FILMS}>
        <Route path={ROUTES_LINKS.FILM} element={<MoviePage/>}/>
        <Route path={ROUTES_LINKS.REVIEW} element={<PrivateRoute><AddReviewPage/></PrivateRoute>}/>
      </Route>
      <Route path={ROUTES_LINKS.PLAYER} element={<PlayerPage/>}/>
      <Route path={ROUTES_LINKS.NOT_FOUND} element={<NotFoundPage/>}/>
    </Routes>
  </BrowserRouter>
);
