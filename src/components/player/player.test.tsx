import {render, screen} from '@testing-library/react';
import {MemoryRouter} from 'react-router-dom';
import {filmsDetails} from '../../mocs/film-info.ts';
import {Player} from './player';

const mockFilm = filmsDetails[0];

describe('Player', () => {
  test('renders player component with controls', () => {
    render(
      <MemoryRouter>
        <Player film={mockFilm}/>
      </MemoryRouter>
    );

    const player = screen.getByTestId('player');
    expect(player).toBeInTheDocument();
  });
});
