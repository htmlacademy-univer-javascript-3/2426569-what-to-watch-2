import {fireEvent, render, screen, waitFor} from '@testing-library/react';
import {FILM_PREVIEW_MS} from '../../consts.ts';
import {filmsList} from '../../mocs/film-info.ts';
import {SmallPreviewPlayer} from './small-preview-player.tsx';

const mockFilmInfo = filmsList[0];

describe('SmallPreviewPlayer', () => {
  test('renders image initially', () => {
    render(<SmallPreviewPlayer {...mockFilmInfo} width={'100px'} height={'100px'}/>);
    const imageElement = screen.getByAltText('Film 1');
    expect(imageElement).toBeInTheDocument();
  });

  test('renders video on mouse enter', async () => {
    render(<SmallPreviewPlayer {...mockFilmInfo} width={'100px'} height={'100px'}/>);
    const container = screen.getByTestId('small-preview-container');

    fireEvent.mouseEnter(container);

    await waitFor(() => {
      setTimeout(() => {
        const videoElement = screen.getByRole('video');
        expect(videoElement).toBeInTheDocument();
        expect(videoElement).toHaveAttribute('src', 'https://example.com/sample.mp4');
        expect(videoElement).toHaveAttribute('poster', 'https://example.com/sample.jpg');
      }, FILM_PREVIEW_MS + 100);
    });
  });

  test('video plays on mouse enter', async () => {
    render(<SmallPreviewPlayer {...mockFilmInfo} width={'100px'} height={'100px'}/>);
    const container = screen.getByTestId('small-preview-container');

    fireEvent.mouseEnter(container);


    await waitFor(() => {
      setTimeout(() => {
        const videoElement: HTMLVideoElement = screen.getByRole('video');
        expect(videoElement).toHaveAttribute('src', 'https://example.com/sample.mp4');
        expect(videoElement.paused).toBe(false);
      }, FILM_PREVIEW_MS + 100);
    });
  });

  test('video stops on mouse leave', async () => {
    render(<SmallPreviewPlayer {...mockFilmInfo} width={'100px'} height={'100px'}/>);
    const container = screen.getByTestId('small-preview-container');

    fireEvent.mouseEnter(container);
    await waitFor(() => {
      setTimeout(() => {
        fireEvent.mouseLeave(container);

        const videoElement: HTMLVideoElement = screen.getByRole('video');
        expect(videoElement.paused).toBe(true);
      }, FILM_PREVIEW_MS + 100);
    });
  });
});
