import {configureMockStore} from '@jedmao/redux-mock-store';
import {render, screen, waitFor} from '@testing-library/react';
import {Provider} from 'react-redux';
import {MemoryRouter, Route, Routes} from 'react-router-dom';
import thunk from 'redux-thunk';
import {filmsList} from '../../mocs/film-info.ts';
import userData from '../../mocs/user-data.ts';
import configureAxios from '../../services/api.ts';
import {AuthStatus} from '../../types/auth-status.ts';
import {ReducerName} from '../../types/reducer-name.ts';
import {State} from '../../types/state';
import {MyListPage} from './my-list-page';


const api = configureAxios();
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore<State>(middlewares);

const mockFilms = filmsList;
const mockUser = userData;

describe('MyListPage Component', () => {
  it('renders My List page with favorite films', async () => {
    const store = mockStore({
      [ReducerName.User]: {
        authStatus: AuthStatus.Auth,
        userData: mockUser,
        favoriteFilms: mockFilms,
        favoriteCount: mockFilms.length,
      },
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Routes>
            <Route path='*' element={<MyListPage/>}/>
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    await waitFor(() => {
      const myListTitle = screen.getByText(/My list/);
      expect(myListTitle).toBeInTheDocument();

      const filmCount = screen.getByTestId('favorite-count');
      expect(filmCount).toHaveTextContent(String(mockFilms.length));

      const films = screen.getAllByTestId('small-film-card');
      expect(films).toHaveLength(mockFilms.length);
    });
  });
});
