import {configureMockStore} from '@jedmao/redux-mock-store';
import {Action, ThunkDispatch} from '@reduxjs/toolkit';
import {render, screen} from '@testing-library/react';
import {Provider} from 'react-redux';
import {MemoryRouter} from 'react-router-dom';
import thunk from 'redux-thunk';
import {DEFAULT_GENRE} from '../consts.ts';
import {filmsDetails} from '../mocs/film-info.ts';
import configureAxios from '../services/api';
import {AuthStatus} from '../types/auth-status.ts';
import {ReducerName} from '../types/reducer-name';
import {State} from '../types/state';
import {AppRoutes} from './app-routes.tsx';

const api = configureAxios();
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore<
  State,
  Action,
  ThunkDispatch<State, typeof api, Action>
>(middlewares);

const mockFilm = filmsDetails[0];

describe('logged in routing', () => {
  const store = mockStore({
    [ReducerName.User]: {
      authStatus: AuthStatus.Auth,
      userData: null,
      favoriteFilms: [],
      favoriteCount: 0,
    },
    [ReducerName.Film]: {
      film: mockFilm,
      reviewsList: [],
      similarFilmsList: [],

      isFilmLoading: false,
      isSimilarFilmsLoading: false,
    },
    [ReducerName.App]: {
      films: [mockFilm],
      promo: mockFilm,
      selectedGenre: DEFAULT_GENRE,
      filteredFilms: [mockFilm],
      isFilmsLoading: false,
      isPromoLoading: false,
    },
  });

  const routes = ['/'];

  const fakeApp = (
    <Provider store={store}>
      <MemoryRouter initialEntries={routes}>
        <AppRoutes />
      </MemoryRouter>
    </Provider>
  );

  it('should render main page when navigated to "/"', () => {
    render(fakeApp);
    const allByText = screen.getAllByText(mockFilm.name);
    expect(allByText).toHaveLength(2);
    expect(screen.getByText(/Play/i)).toBeInTheDocument();
    expect(screen.getByText(/All genres/i)).toBeInTheDocument();
  });

  it('should render main page when navigated to "/login"', () => {
    routes.push('/login');
    render(fakeApp);
    const allByText = screen.getAllByText(mockFilm.name);
    expect(allByText).toHaveLength(2);
    expect(screen.getByText(/Play/i)).toBeInTheDocument();
    expect(screen.getByText(/All genres/i)).toBeInTheDocument();
  });

  it('should render film page when navigated to "/films/{id}"', () => {
    routes.push('/films/1');
    render(fakeApp);
    expect(screen.getByText(mockFilm.name)).toBeInTheDocument();
    expect(screen.getByText(mockFilm.genre)).toBeInTheDocument();
    expect(screen.getByText(/Overview/i)).toBeInTheDocument();
    expect(screen.getByText(/Details/i)).toBeInTheDocument();
    expect(screen.getByText(/Reviews/i)).toBeInTheDocument();
    expect(screen.getByText(/2023 What to watch Ltd./i)).toBeInTheDocument();
  });

  it('should render player when navigated to "/player/{id}"', () => {
    routes.push('/player/1');
    render(fakeApp);
    expect(screen.getByText(/Exit/i)).toBeInTheDocument();
    expect(screen.getByText(/Toggler/i)).toBeInTheDocument();
  });

  it('should render reviews editor when navigated to "/films/{id}/review"', () => {
    routes.push('/films/1/review');
    render(fakeApp);
    expect(screen.getByText(/Add review/i)).toBeInTheDocument();
  });

  it('should render favorites list when navigated to "/mylist"', () => {
    routes.push('/mylist');
    render(fakeApp);
    expect(screen.getByText(/My list/i)).toBeInTheDocument();
  });

  it('should render not found when navigated to non-existent route', () => {
    routes.push('/asdasd');
    render(fakeApp);
    expect(screen.getByText('Страница не найдена')).toBeInTheDocument();
  });
});

describe('not logged in routing', () => {
  const store = mockStore({
    [ReducerName.User]: {
      authStatus: AuthStatus.NoAuth,
      userData: null,
      favoriteFilms: [],
      favoriteCount: 0,
    },
    [ReducerName.Film]: {
      film: mockFilm,
      reviewsList: [],
      similarFilmsList: [],

      isFilmLoading: false,
      isSimilarFilmsLoading: false,
    },
    [ReducerName.App]: {
      films: [mockFilm],
      promo: mockFilm,
      selectedGenre: DEFAULT_GENRE,
      filteredFilms: [mockFilm],
      isFilmsLoading: false,
      isPromoLoading: false,
    },
  });

  const routes = ['/'];

  const fakeApp = (
    <Provider store={store}>
      <MemoryRouter initialEntries={routes}>
        <AppRoutes />
      </MemoryRouter>
    </Provider>
  );

  it('should render main page when navigated to "/"', () => {
    render(fakeApp);
    const allByText = screen.getAllByText(mockFilm.name);
    expect(allByText).toHaveLength(2);
    expect(screen.getByText(/Play/i)).toBeInTheDocument();
    expect(screen.getByText(/All genres/i)).toBeInTheDocument();
  });

  it('should render login page when navigated to "/login"', () => {
    routes.push('/login');
    render(fakeApp);
    expect(screen.getByText(/Email address/i)).toBeInTheDocument();
    expect(screen.getByText(/Password/i)).toBeInTheDocument();
  });

  it('should render film page when navigated to "/films/{id}"', () => {
    routes.push('/films/1');
    render(fakeApp);
    expect(screen.getByText(mockFilm.name)).toBeInTheDocument();
    expect(screen.getByText(mockFilm.genre)).toBeInTheDocument();
    expect(screen.getByText(/Overview/i)).toBeInTheDocument();
    expect(screen.getByText(/Details/i)).toBeInTheDocument();
    expect(screen.getByText(/Reviews/i)).toBeInTheDocument();
    expect(screen.getByText(/2023 What to watch Ltd./i)).toBeInTheDocument();
  });

  it('should render player when navigated to "/player/{id}"', () => {
    routes.push('/player/1');
    render(fakeApp);
    expect(screen.getByText(/Exit/i)).toBeInTheDocument();
    expect(screen.getByText(/Toggler/i)).toBeInTheDocument();
  });

  it('should render not found when navigated to non-existent route', () => {
    routes.push('/qwertasdfg');
    render(fakeApp);
    expect(screen.getByText('404')).toBeInTheDocument();
  });
});
