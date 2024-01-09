import {configureMockStore} from '@jedmao/redux-mock-store';
import {render, screen} from '@testing-library/react';
import {Provider} from 'react-redux';
import {MemoryRouter} from 'react-router-dom';
import {filmsDetails} from '../../mocs/film-info.ts';
import reviews from '../../mocs/review.ts';
import {ReducerName} from '../../types/reducer-name';
import {TabTypes} from '../../types/tab-types.ts';
import {FilmDescription} from './film-description';

const mockStore = configureMockStore();

const mockFilm = filmsDetails[0];
const mockReviews = reviews;

describe('FilmDescription Component', () => {
  it('should render tabs and the default panel', () => {
    const store = mockStore({
      [ReducerName.Film]: {
        film: mockFilm,
      },
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <FilmDescription film={mockFilm} reviews={mockReviews}/>
        </MemoryRouter>
      </Provider>
    );

    const tabs = Object.values(TabTypes);

    for (const tab of tabs) {
      expect(screen.getByText(tab)).toBeInTheDocument();
    }
  });
});
