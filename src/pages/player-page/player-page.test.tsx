import {configureMockStore} from '@jedmao/redux-mock-store';
import {fireEvent, render, screen, waitFor} from '@testing-library/react';
import {Provider} from 'react-redux';
import {MemoryRouter, Route, Routes} from 'react-router-dom';
import thunk from 'redux-thunk';
import {filmsDetails} from '../../mocs/film-info.ts';
import {RoutesLinks} from '../../routes/route-links.ts';
import configureAxios from '../../services/api.ts';
import {ReducerName} from '../../types/reducer-name';
import {State} from '../../types/state';
import {PlayerPage} from './player-page.tsx';

const api = configureAxios();
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore<State>(middlewares);

const mockFilm = filmsDetails[0];

describe('Player page', () => {
  it('renders video player with controls', async () => {
    const store = mockStore({
      [ReducerName.Film]: {
        film: mockFilm,
        isFilmLoading: false,
      },
    });

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[RoutesLinks.Player.replace(':id', '1')]}>
          <Routes>
            <Route path={RoutesLinks.Player} element={<PlayerPage/>}/>
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    await waitFor(() => {
      const videoPlayer = screen.getByTestId('player-video');
      expect(videoPlayer).toBeInTheDocument();

      const exitButton = screen.getByText('Exit');
      expect(exitButton).toBeInTheDocument();

      const playButton = screen.getByText('Play');
      expect(playButton).toBeInTheDocument();
    });
  });

  it('toggles play/pause when play button is clicked', async () => {
    const store = mockStore({
      [ReducerName.Film]: {
        film: mockFilm,
        isFilmLoading: false,
      },
    });

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[RoutesLinks.Player.replace(':id', '1')]}>
          <Routes>
            <Route path={RoutesLinks.Player} element={<PlayerPage/>}/>
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    const playButton = screen.getByTestId('player-play-btn');
    const videoPlayer: HTMLVideoElement = screen.getByTestId('player-video');

    expect(videoPlayer.paused).toBe(true);

    fireEvent.click(playButton);

    await waitFor(() => {
      setTimeout(() => {
        expect(videoPlayer.paused).toBe(false);
      }, 1000);
    });
  });

  it('show spinner while fetching film', () => {
    const store = mockStore({
      [ReducerName.Film]: {
        film: null,
        isFilmLoading: true,
      },
    });

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[RoutesLinks.Player.replace(':id', '1')]}>
          <Routes>
            <Route path={RoutesLinks.Player} element={<PlayerPage/>}/>
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    const spinner = screen.getByTestId('spinner');
    expect(spinner).toBeInTheDocument();
  });
});
