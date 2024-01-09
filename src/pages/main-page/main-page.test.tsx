import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import thunk from 'redux-thunk';
import {DEFAULT_GENRE} from '../../consts.ts';
import {filmsDetails, filmsList} from '../../mocs/film-info.ts';
import userData from '../../mocs/user-data.ts';
import configureAxios from '../../services/api.ts';
import {AuthStatus} from '../../types/auth-status.ts';
import { State } from '../../types/state';
import { ReducerName } from '../../types/reducer-name';
import MainPage from './main-page.tsx';


const api = configureAxios();
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore<State>(middlewares);

const promoFilm = filmsDetails[0];
const mockFilms = filmsList;
const mockUser = userData;
const uniquePromoName = 'UniquePromo';

describe('MainPage Component', () => {
  it('renders Main page with promo film', async () => {
    const store = mockStore({
      [ReducerName.App]: {
        films: mockFilms,
        promo: {...promoFilm, name: uniquePromoName},
        selectedGenre: DEFAULT_GENRE,
        filteredFilms: mockFilms,
        isFilmsLoading: false,
        isPromoLoading: false,
      },
      [ReducerName.User]: {
        authStatus: AuthStatus.Auth,
        userData: mockUser,
      },
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <MainPage />
        </MemoryRouter>
      </Provider>
    );

    await waitFor(() => {
      const promoFilmTitle = screen.getByText(uniquePromoName);
      expect(promoFilmTitle).toBeInTheDocument();

      const catalog = screen.getByTestId('catalog');
      expect(catalog).toBeInTheDocument();

      const footer = screen.getByTestId('page-footer');
      expect(footer).toBeInTheDocument();
    });
  });

  it('renders loading spinner while fetching promo film', () => {
    const store = mockStore({
      [ReducerName.App]: {
        promo: undefined,
        filteredFilms: [],
        films: [],
        isPromoLoading: true,
      },
      [ReducerName.User]: {
        authStatus: AuthStatus.NoAuth,
        userData: mockUser,
      },
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <MainPage />
        </MemoryRouter>
      </Provider>
    );

    const spinner = screen.getByTestId('spinner');
    expect(spinner).toBeInTheDocument();
  });

  it('renders loading spinner while fetching promo film and fetching films', () => {
    const store = mockStore({
      [ReducerName.App]: {
        promo: undefined,
        filteredFilms: [],
        films: [],
        isPromoLoading: true,
        isFilmsLoading: true,
      },
      [ReducerName.User]: {
        authStatus: AuthStatus.NoAuth,
        userData: mockUser,
      },
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <MainPage />
        </MemoryRouter>
      </Provider>
    );

    const spinner = screen.getAllByTestId('spinner');
    expect(spinner).toHaveLength(2);
  });
});
