import {configureMockStore} from '@jedmao/redux-mock-store';
import {render, screen} from '@testing-library/react';
import {Provider} from 'react-redux';
import {MemoryRouter} from 'react-router-dom';
import {filmsDetails} from '../../mocs/film-info.ts';
import userData from '../../mocs/user-data.ts';
import {AuthStatus} from '../../types/auth-status.ts';
import {ReducerName} from '../../types/reducer-name';
import FilmCard from './film-card';

const mockStore = configureMockStore();

const mockFilm = filmsDetails[0];
const mockUser = userData;

describe('FilmCard Component', () => {
  const initialState = {
    [ReducerName.User]: {
      authStatus: AuthStatus.Auth,
      userData: mockUser,
      favoriteCount: 0
    },
    [ReducerName.App]: {
      error: null,
      promo: mockFilm,
      isPromoLoading: false,
    },
  };

  it('should render the film card with correct details', () => {
    const store = mockStore(initialState);

    render(
      <Provider store={store}>
        <MemoryRouter>
          <FilmCard film={mockFilm} isLoading={false}/>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(mockFilm.name)).toBeInTheDocument();
    expect(screen.getByText(mockFilm.genre)).toBeInTheDocument();
    expect(screen.getByText(mockFilm.released)).toBeInTheDocument();
  });

  it('renders loading spinner while fetching film', () => {
    const store = mockStore(initialState);

    render(
      <Provider store={store}>
        <MemoryRouter>
          <FilmCard film={undefined} isLoading/>
        </MemoryRouter>
      </Provider>
    );

    const spinner = screen.getByTestId('spinner');
    expect(spinner).toBeInTheDocument();
  });
});
