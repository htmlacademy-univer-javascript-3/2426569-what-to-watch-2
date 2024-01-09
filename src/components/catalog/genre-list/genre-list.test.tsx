import {configureMockStore} from '@jedmao/redux-mock-store';
import {render, screen} from '@testing-library/react';
import {Provider} from 'react-redux';
import {MemoryRouter} from 'react-router-dom';
import thunk from 'redux-thunk';
import {DEFAULT_GENRE} from '../../../consts.ts';
import {filmsList} from '../../../mocs/film-info.ts';
import {ReducerName} from '../../../types/reducer-name.ts';
import {GenreList} from './genre-list';

const mockStore = configureMockStore([thunk]);

const initialState = {
  [ReducerName.App]: {
    currentGenre: DEFAULT_GENRE,
    films: filmsList,
  },
};

describe('GenreList Component', () => {
  it('should render all genres from genreList', () => {
    const store = mockStore(initialState);

    render(
      <MemoryRouter>
        <Provider store={store}>
          <GenreList />
        </Provider>
      </MemoryRouter>
    );

    const genres = screen.getAllByRole('listitem');

    expect(genres).toHaveLength(4);

    const defaultGenre = screen.getByText(DEFAULT_GENRE);
    expect(defaultGenre).toBeInTheDocument();
  });
});

