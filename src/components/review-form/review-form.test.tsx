import {configureMockStore} from '@jedmao/redux-mock-store';
import {fireEvent, render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {Provider} from 'react-redux';
import {MemoryRouter} from 'react-router-dom';
import thunk from 'redux-thunk';
import {MAX_FILM_RATING} from '../../consts.ts';
import {filmsDetails} from '../../mocs/film-info.ts';
import configureAxios from '../../services/api.ts';
import {AuthStatus} from '../../types/auth-status.ts';
import {ReducerName} from '../../types/reducer-name.ts';
import {State} from '../../types/state.ts';
import {ReviewForm} from './review-form.tsx';

const mockFilm = filmsDetails[0];
const mockFilmId = mockFilm.id;

const api = configureAxios();
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore<State>(middlewares);

describe('ReviewForm', () => {
  const initialState = {
    [ReducerName.User]: {
      authStatus: AuthStatus.Auth,
    },
    [ReducerName.Film]: {
      film: mockFilm,
    },
  };

  test('renders form with stars and textarea', () => {
    const store = mockStore(initialState);
    render(
      <MemoryRouter>
        <Provider store={store}>
          <ReviewForm filmId={mockFilmId}/>
        </Provider>
      </MemoryRouter>
    );

    const stars = screen.getAllByLabelText(/Rating \d/);
    const textarea = screen.getByPlaceholderText('Review text');
    const submitButton = screen.getByText('Post');

    expect(stars).toHaveLength(MAX_FILM_RATING);
    expect(textarea).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  test('submit button is disabled when form is not filled', () => {
    const store = mockStore(initialState);
    render(
      <MemoryRouter>
        <Provider store={store}>
          <ReviewForm filmId={mockFilmId}/>
        </Provider>
      </MemoryRouter>
    );
    const submitButton = screen.getByText('Post');

    expect(submitButton).toBeDisabled();
  });

  test('submit button is enabled when form is filled', () => {
    const store = mockStore(initialState);
    render(
      <MemoryRouter>
        <Provider store={store}>
          <ReviewForm filmId={mockFilmId}/>
        </Provider>
      </MemoryRouter>
    );

    const textarea = screen.getByPlaceholderText('Review text');
    const submitButton = screen.getByText('Post');
    fireEvent.change(textarea, {target: {value: 'This is a review text.........................................'}});
    fireEvent.click(screen.getByLabelText('Rating 5'));

    expect(submitButton).not.toBeDisabled();
  });

  test('submits form with correct data', () => {
    const store = mockStore(initialState);
    render(
      <MemoryRouter>
        <Provider store={store}>
          <ReviewForm filmId={mockFilmId}/>
        </Provider>
      </MemoryRouter>
    );
    const textarea = screen.getByPlaceholderText('Review text');
    const submitButton = screen.getByText('Post');

    userEvent.type(textarea, 'This is a review text');
    fireEvent.click(screen.getByLabelText('Rating 5'));
    fireEvent.submit(submitButton);
  });
});
