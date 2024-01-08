// FilmDetails.test.tsx
import {render, screen} from '@testing-library/react';
import {MemoryRouter} from 'react-router-dom';
import {filmsDetails} from '../../../mocs/film-info.ts';
import {Details} from './details.tsx';

const mockFilmDetails = filmsDetails[0];

describe('Details', () => {
  test('renders film details with correct content', () => {
    render(
      <MemoryRouter>
        <Details film={mockFilmDetails}/>
      </MemoryRouter>
    );

    const director = screen.getByText('Director');
    const starring = screen.getByText('Starring');
    const runTime = screen.getByText('Run Time');
    const genre = screen.getByText('Genre');
    const released = screen.getByText('Released');

    expect(director.nextSibling).toHaveTextContent(mockFilmDetails.director);
    expect(starring.nextSibling).toHaveTextContent(mockFilmDetails.starring.join(', '));
    expect(runTime.nextSibling).toHaveTextContent(`${mockFilmDetails.runTime}`);
    expect(genre.nextSibling).toHaveTextContent(mockFilmDetails.genre);
    expect(released.nextSibling).toHaveTextContent(`${mockFilmDetails.released}`);
  });
});
