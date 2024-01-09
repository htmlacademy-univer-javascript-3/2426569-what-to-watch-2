import {configureMockStore} from '@jedmao/redux-mock-store';
import {fireEvent, render, screen} from '@testing-library/react';
import {Provider} from 'react-redux';
import {MemoryRouter} from 'react-router-dom';
import thunk from 'redux-thunk';
import userData from '../../mocs/user-data.ts';
import {RoutesLinks} from '../../routes/route-links.ts';
import configureAxios from '../../services/api.ts';
import {AuthStatus} from '../../types/auth-status';
import {ReducerName} from '../../types/reducer-name.ts';
import {State} from '../../types/state.ts';
import {UserBlock} from './user-block.tsx';

const api = configureAxios();
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore<State>(middlewares);

const mockUser = userData;

describe('UserBlock component', () => {

  const initialAuth = {
    [ReducerName.User]: {
      authStatus: AuthStatus.Auth,
      userData: mockUser,
      favoriteCount: 10
    },
  };

  const initialNoAuth = {
    [ReducerName.User]: {
      authStatus: AuthStatus.NoAuth,
      userData: mockUser,
      favoriteCount: 10
    },
  };

  test('renders UserBlock with Sign In link when not authenticated', () => {
    const store = mockStore(initialNoAuth);

    render(
      <Provider store={store}>
        <MemoryRouter>
          <UserBlock />
        </MemoryRouter>
      </Provider>
    );

    const signInLink = screen.getByText(/Sign in/i);
    expect(signInLink).toBeInTheDocument();
  });

  test('renders UserBlock with Sign Out link when authenticated', () => {
    const store = mockStore(initialAuth);

    render(
      <Provider store={store}>
        <MemoryRouter>
          <UserBlock />
        </MemoryRouter>
      </Provider>
    );

    const signOutLink = screen.getByText(/Sign out/i);
    expect(signOutLink).toBeInTheDocument();
  });

  test('dispatches logout action and navigates to Main on Sign Out click', () => {
    const store = mockStore(initialAuth);

    render(
      <Provider store={store}>
        <MemoryRouter>
          <UserBlock />
        </MemoryRouter>
      </Provider>
    );

    const signOutLink = screen.getByText(/Sign out/i);
    fireEvent.click(signOutLink);
    expect(window.location.pathname).toBe(RoutesLinks.Main);
  });
});
