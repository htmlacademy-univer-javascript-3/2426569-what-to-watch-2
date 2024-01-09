import {configureMockStore} from '@jedmao/redux-mock-store';
import {render, screen} from '@testing-library/react';
import {Provider} from 'react-redux';
import {MemoryRouter, Route, Routes} from 'react-router-dom';
import {AuthStatus} from '../types/auth-status.ts';
import {ReducerName} from '../types/reducer-name';
import PrivateRoute from './private-route';
import {RoutesLinks} from './route-links.ts';

describe('PrivateRoute', () => {
  const mockStore = configureMockStore([]);

  it('should render public route when user is not authorized', () => {
    const store = mockStore({
      [ReducerName.User]: {authStatus: AuthStatus.NoAuth},
    });

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/login']}>
          <Routes>
            <Route path={RoutesLinks.SingIn} element={<h1>public</h1>}/>
            <Route path="/private" element={<PrivateRoute><h1>private</h1></PrivateRoute>}/>
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/public/i)).toBeInTheDocument();
    expect(screen.queryByText(/private/i)).not.toBeInTheDocument();
  });

  it('should render private route when user is authorized', () => {
    const store = mockStore({
      [ReducerName.User]: {authStatus: AuthStatus.Auth},
    });

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/private']}>
          <Routes>
            <Route path={RoutesLinks.SingIn} element={<h1>public</h1>}/>
            <Route path="/private" element={<PrivateRoute><h1>private</h1></PrivateRoute>}/>
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/private/i)).toBeInTheDocument();
    expect(screen.queryByText(/public/i)).not.toBeInTheDocument();
  });
});
