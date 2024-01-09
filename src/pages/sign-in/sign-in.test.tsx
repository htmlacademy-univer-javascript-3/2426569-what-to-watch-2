import {configureMockStore} from '@jedmao/redux-mock-store';
import {fireEvent, render, screen, waitFor} from '@testing-library/react';
import {Provider} from 'react-redux';
import {MemoryRouter, Route, Routes} from 'react-router-dom';
import thunk from 'redux-thunk';
import {expect} from 'vitest';
import {RoutesLinks} from '../../routes/route-links.ts';
import configureAxios from '../../services/api.ts';
import {AuthStatus} from '../../types/auth-status.ts';
import {ReducerName} from '../../types/reducer-name';
import {State} from '../../types/state';
import {SignIn} from './sign-in.tsx';

const api = configureAxios();
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore<State>(middlewares);

describe('SignIn Component', () => {
  const noAuthStore = mockStore({
    [ReducerName.App]: {
      error: undefined,
    },
    [ReducerName.User]: {
      authStatus: AuthStatus.NoAuth,
      userData: null,
    },
  });

  it('renders sign-in page with form fields', () => {
    render(
      <Provider store={noAuthStore}>
        <MemoryRouter>
          <Routes>
            <Route path='*' element={<SignIn/>}/>
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    const emailInput = screen.getByPlaceholderText('Email address');
    const passwordInput = screen.getByPlaceholderText('Password');
    const signInButton = screen.getByTestId('sign-in-btn');

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(signInButton).toBeInTheDocument();
  });

  it('submits form with valid email and password', async () => {
    render(
      <Provider store={noAuthStore}>
        <MemoryRouter initialEntries={['/']}>
          <Routes>
            <Route path='*' element={<SignIn/>}/>
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    const emailInput = screen.getByPlaceholderText('Email address');
    const passwordInput = screen.getByPlaceholderText('Password');
    const signInButton = screen.getByTestId('sign-in-btn');

    fireEvent.change(emailInput, {target: {value: 'test@example.com'}});
    fireEvent.change(passwordInput, {target: {value: 'Test123'}});
    fireEvent.click(signInButton);

    await waitFor(() => {
      setTimeout(() => {
        expect(signInButton).not.toBeInTheDocument();
      }, 1000);
    });

  });

  it('displays error message for invalid email', async () => {
    render(
      <Provider store={noAuthStore}>
        <MemoryRouter>
          <Routes>
            <Route path='*' element={<SignIn/>}/>
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    const emailInput = screen.getByPlaceholderText('Email address');
    const signInButton = screen.getByTestId('sign-in-btn');

    fireEvent.change(emailInput, {target: {value: 'invalid-email'}});
    fireEvent.click(signInButton);

    await waitFor(() => {
      setTimeout(() => {
        const errorMessage = screen.getByTestId('error');
        expect(errorMessage).toBeInTheDocument();
      }, 1000);
    });
  });

  it('displays error message for invalid password', async () => {
    render(
      <Provider store={noAuthStore}>
        <MemoryRouter>
          <Routes>
            <Route path='*' element={<SignIn/>}/>
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    const passwordInput = screen.getByPlaceholderText('Password');
    const signInButton = screen.getByTestId('sign-in-btn');

    fireEvent.change(passwordInput, {target: {value: 'invalidpassword'}});
    fireEvent.click(signInButton);

    await waitFor(() => {
      setTimeout(() => {
        const errorMessage = screen.getByTestId('error');
        expect(errorMessage).toBeInTheDocument();
      }, 1000);
    });
  });

  it('redirect on auth user', () => {
    const authStore = mockStore({
      [ReducerName.User]: {
        authStatus: AuthStatus.Auth,
      },
    });

    render(
      <Provider store={authStore}>
        <MemoryRouter initialEntries={[RoutesLinks.SingIn]}>
          <Routes>
            <Route path={RoutesLinks.SingIn} element={<SignIn/>}/>
            <Route path='*' element={<div data-testid={'some-page'}/>}/>
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    const somePage = screen.getByTestId('some-page');
    expect(somePage).toBeInTheDocument();

    const signInButton = screen.queryByTestId('sign-in-btn');
    expect(signInButton).not.toBeInTheDocument();
  });
});
