import {configureMockStore} from '@jedmao/redux-mock-store';
import {fireEvent, render, screen, waitFor} from '@testing-library/react';
import {Provider} from 'react-redux';
import {MemoryRouter} from 'react-router-dom';
import thunk from 'redux-thunk';
import {DEFAULT_GENRE, MAX_FILMS_IN_PAGE} from '../../consts.ts';
import {filmsList} from '../../mocs/film-info.ts';
import {FilmInfo} from '../../types/film-info.ts';
import {ReducerName} from '../../types/reducer-name.ts';
import {State} from '../../types/state.ts';
import {Catalog} from './catalog.tsx';

const mockFilm = filmsList[0];
const mockStore = configureMockStore<State>([thunk]);
const mockFilms: FilmInfo[] = [];

Array.from({length: MAX_FILMS_IN_PAGE * 2}).map((_, i) => {
  mockFilms.push({
    id: `${i}`,
    name: `Film ${i}`,
    previewImage: `https://example.com/film${i}.jpg`,
    previewVideoLink: `https://example.com/film${i}.mp4`,
    genre: 'Genre',
  });
});

describe('CatalogComponent', () => {
  const store = mockStore({
    [ReducerName.App]: {
      films: mockFilms,
      selectedGenre: DEFAULT_GENRE,
      filteredFilms: [mockFilm],
      isFilmsLoading: false,
    },
  });

  it('renders catalog without genres and show more button', () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <Catalog withoutGenres withoutShowMore filmsList={mockFilms} isLoading={false}/>
        </Provider>
      </MemoryRouter>
    );

    const catalog = screen.getByTestId('catalog');
    expect(catalog).toBeInTheDocument();

    const genreList = screen.queryByTestId('catalog__genres-list');
    expect(genreList).not.toBeInTheDocument();

    const showMoreButton = screen.queryByText('Show more');
    expect(showMoreButton).not.toBeInTheDocument();

    const filmList = screen.getByText('Film 1');
    expect(filmList).toBeInTheDocument();
  });

  it('renders catalog with genres and show more button', () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <Catalog filmsList={mockFilms} isLoading={false}/>
        </Provider>
      </MemoryRouter>
    );

    const catalog = screen.getByTestId('catalog');
    expect(catalog).toBeInTheDocument();

    const genreList = screen.queryByTestId('catalog__genres-list');
    expect(genreList).toBeInTheDocument();

    const filmList = screen.getByText('Film 1');
    expect(filmList).toBeInTheDocument();

    const showMoreButton = screen.getByText('Show more');
    expect(showMoreButton).toBeInTheDocument();

    const films = screen.getAllByTestId('small-film-card');
    expect(films).toHaveLength(MAX_FILMS_IN_PAGE);
  });

  it('loads more films when show more button is clicked', async () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <Catalog filmsList={mockFilms} isLoading={false}/>
        </Provider>
      </MemoryRouter>
    );

    const initialFilmList = screen.getAllByText(/Film \d/);
    expect(initialFilmList.length).toBe(MAX_FILMS_IN_PAGE);

    const showMoreButton = screen.getByText('Show more');
    fireEvent.click(showMoreButton);

    await waitFor(() => {
      const updatedFilmList = screen.getAllByText(/Film \d/);
      expect(updatedFilmList.length).toBe(MAX_FILMS_IN_PAGE + MAX_FILMS_IN_PAGE);
    });
  });
});
