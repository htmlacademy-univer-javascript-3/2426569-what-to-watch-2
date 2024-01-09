import {configureMockStore} from '@jedmao/redux-mock-store';
import {Action, ThunkDispatch} from '@reduxjs/toolkit';
import {render, screen} from '@testing-library/react';
import {Provider} from 'react-redux';
import {MemoryRouter, Route, Routes} from 'react-router-dom';
import thunk from 'redux-thunk';
import {filmsDetails} from '../../mocs/film-info.ts';
import userData from '../../mocs/user-data.ts';
import {RoutesLinks} from '../../routes/route-links.ts';
import configureAxios from '../../services/api.ts';
import {AuthStatus} from '../../types/auth-status.ts';
import {ReducerName} from '../../types/reducer-name.ts';
import {State} from '../../types/state.ts';
import AddReviewPage from './add-review.tsx';

const api = configureAxios();
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore<
  State,
  Action,
  ThunkDispatch<State, typeof api, Action>
>(middlewares);

const mockFilm = filmsDetails[0];
const mockUser = userData;

describe('AddReviewPage Component', () => {

  it('renders loading spinner while fetching film data', () => {
    const store = mockStore({
      [ReducerName.Film]: {
        film: null,
        isFilmLoading: true,
      },
    });

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[RoutesLinks.AddReview.replace(':id', '1')]}>
          <Routes>
            <Route path={RoutesLinks.AddReview} element={<AddReviewPage/>}/>
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    const spinner = screen.getByTestId('spinner');
    expect(spinner).toBeInTheDocument();
  });

  it('renders 404 page when film ID is not available', () => {
    const store = mockStore({
      [ReducerName.Film]: {
        film: null,
        isFilmLoading: false,
      },
      [ReducerName.User]: {
        authStatus: AuthStatus.Auth,
        userData: null,
      },
    });

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[RoutesLinks.AddReview.replace(':id', 'invalidID')]}>
          <Routes>
            <Route path={RoutesLinks.AddReview} element={<AddReviewPage/>}/>
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/404/)).toBeInTheDocument();

  });

  it('renders add review page with film data', () => {

    const store = mockStore({
      [ReducerName.Film]: {
        film: mockFilm,
        isFilmLoading: false,
      },
      [ReducerName.User]: {
        authStatus: AuthStatus.Auth,
        userData: mockUser,
      },
    });

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[RoutesLinks.AddReview.replace(':id', '1')]}>
          <Routes>
            <Route path={RoutesLinks.AddReview} element={<AddReviewPage/>}/>
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    const addReviewForm = screen.getByText(/Add review/);
    expect(addReviewForm).toBeInTheDocument();
  });
});
