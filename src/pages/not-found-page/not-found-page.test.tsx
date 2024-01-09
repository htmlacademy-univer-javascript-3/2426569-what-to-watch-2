import {configureMockStore} from '@jedmao/redux-mock-store';
import {render, screen} from '@testing-library/react';
import {Provider} from 'react-redux';
import {MemoryRouter, Route, Routes} from 'react-router-dom';
import thunk from 'redux-thunk';
import {RoutesLinks} from '../../routes/route-links.ts';
import configureAxios from '../../services/api';
import {AuthStatus} from '../../types/auth-status.ts';
import {ReducerName} from '../../types/reducer-name';
import {State} from '../../types/state';
import {NotFoundPage} from './not-found-page.tsx';


const api = configureAxios();
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore<State>(middlewares);

describe('Page404 Component', () => {
  it('renders 404 page with link to the main page', () => {
    const store = mockStore({
      [ReducerName.User]: {
        authStatus: AuthStatus.NoAuth,
        userData: null,
      },
    });

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/invalid-path']}>
          <Routes>
            <Route path="*" element={<NotFoundPage/>}/>
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    const notFoundTitle = screen.getByText(/404/i);
    const mainPageLink = screen.getByText(/Домой/i);

    expect(notFoundTitle).toBeInTheDocument();
    expect(mainPageLink).toBeInTheDocument();
    expect(mainPageLink).toHaveAttribute('href', RoutesLinks.Main);
  });
});
