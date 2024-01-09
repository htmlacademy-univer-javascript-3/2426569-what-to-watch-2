import {configureMockStore} from '@jedmao/redux-mock-store';
import {render, screen, waitFor} from '@testing-library/react';
import {Provider} from 'react-redux';
import {MemoryRouter, Route, Routes} from 'react-router-dom';
import thunk from 'redux-thunk';
import {MAX_SIMILAR_FILMS_IN_PAGE} from '../../consts.ts';
import {filmsDetails, filmsList} from '../../mocs/film-info.ts';
import userData from '../../mocs/user-data.ts';
import {RoutesLinks} from '../../routes/route-links.ts';
import configureAxios from '../../services/api.ts';
import {AuthStatus} from '../../types/auth-status.ts';
import {ReducerName} from '../../types/reducer-name';
import {State} from '../../types/state';
import {MoviePage} from './movie-page.tsx';

const api = configureAxios();
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore<State>(middlewares);

const mockFilm = filmsDetails[0];
const mockSimilarFilms = filmsList;
const mockUser = userData;


describe('FilmPage Component', () => {
  it('renders loading spinner while fetching film data', () => {
    const store = mockStore({
      [ReducerName.Film]: {
        film: null,
        isFilmLoading: true,
      },
      [ReducerName.User]: {
        authStatus: AuthStatus.NoAuth,
        userData: null,
      },
    });

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[RoutesLinks.Film.replace(':id', '1')]}>
          <Routes>
            <Route path={RoutesLinks.Film} element={<MoviePage/>}/>
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
        authStatus: AuthStatus.NoAuth,
        userData: null,
      },
    });

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[RoutesLinks.Film.replace(':id', 'invalidId')]}>
          <Routes>
            <Route path={RoutesLinks.Film} element={<MoviePage/>}/>
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/404/)).toBeInTheDocument();
  });

  it('renders film page with film data', async () => {
    const store = mockStore({
      [ReducerName.Film]: {
        film: mockFilm,
        isFilmLoading: false,
        similarFilmsList: mockSimilarFilms,
      },
      [ReducerName.User]: {
        authStatus: AuthStatus.NoAuth,
        userData: mockUser,
        favoriteCount: 0
      },
    });

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[RoutesLinks.Film.replace(':id', '1')]}>
          <Routes>
            <Route path={RoutesLinks.Film} element={<MoviePage/>}/>
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    await waitFor(() => {
      const filmTitle = screen.getByText(mockFilm.name);
      expect(filmTitle).toBeInTheDocument();
    });

    const similarFilms = screen.getAllByTestId('small-film-card');
    expect(similarFilms).toHaveLength(Math.min(filmsList.length, MAX_SIMILAR_FILMS_IN_PAGE));
  });
});
