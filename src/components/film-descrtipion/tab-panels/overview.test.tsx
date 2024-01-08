// Overview.test.tsx
import {render, screen} from '@testing-library/react';
import {MemoryRouter} from 'react-router-dom';
import {filmsDetails} from '../../../mocs/film-info.ts';
import {convertFilmRating} from '../../../utils/raiting.ts';
import {Overview} from './overview';

const mockFilmOverview = filmsDetails[0];

describe('Overview', () => {
  test('renders film overview with correct content', () => {
    render(
      <MemoryRouter>
        <Overview film={mockFilmOverview}/>
      </MemoryRouter>
    );

    const rating = screen.getByText(`${mockFilmOverview.rating}`);
    const filmRatingLevel = screen.getByText(convertFilmRating(mockFilmOverview.rating));
    const scoresCount = screen.getByText(`${mockFilmOverview.scoresCount} ratings`);
    const director = screen.getByText(`Director: ${mockFilmOverview.director}`);
    const starring = screen.getByText(`Starring: ${mockFilmOverview.starring.join(', ')}`);
    const description = screen.getByText(mockFilmOverview.description);

    expect(rating).toBeInTheDocument();
    expect(filmRatingLevel).toBeInTheDocument();
    expect(scoresCount).toBeInTheDocument();
    expect(director).toBeInTheDocument();
    expect(starring).toBeInTheDocument();
    expect(description).toBeInTheDocument();
  });
});
