import {configureMockStore} from '@jedmao/redux-mock-store';
import {fireEvent, render, screen} from '@testing-library/react';
import {Provider} from 'react-redux';
import {MemoryRouter} from 'react-router-dom';
import thunk from 'redux-thunk';
import userData from '../../mocs/user-data.ts';
import configureAxios from '../../services/api.ts';
import {AuthStatus} from '../../types/auth-status.ts';
import {ReducerName} from '../../types/reducer-name.ts';
import {State} from '../../types/state.ts';
import {FilmCardButtons} from './film-card-buttons.tsx';

const api = configureAxios();
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore<State>(middlewares);

const mockUser = userData;

describe('FilmCardButtons Component', () => {
  const initialState = {
    [ReducerName.User]: {
      authStatus: AuthStatus.Auth,
      userData: mockUser,
      favoriteCount: 10
    },
  };


  test('renders FilmCardButtons component with play button', () => {
    const store = mockStore(initialState);

    render(
      <Provider store={store}>
        <MemoryRouter>
          <FilmCardButtons filmId="1" isFavorite={false}/>
        </MemoryRouter>
      </Provider>
    );

    const playButton = screen.getByText(/Play/i);
    expect(playButton).toBeInTheDocument();

    const myListButton = screen.getByText(/My list/i);
    fireEvent.click(myListButton);

    const updatedFavoriteCount = screen.getByTestId('favorite-count');
    expect(updatedFavoriteCount).toHaveTextContent('10');
  });

  test('handles click on My list button with review', () => {
    const store = mockStore(initialState);

    render(
      <Provider store={store}>
        <MemoryRouter>
          <FilmCardButtons filmId="1" isFavorite={false} withReview/>
        </MemoryRouter>
      </Provider>
    );
    const addReviewButton = screen.getByText(/Add review/i);
    expect(addReviewButton).toBeInTheDocument();
  });
});
