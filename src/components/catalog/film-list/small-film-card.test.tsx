import {fireEvent, render, screen} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import {MemoryRouter} from 'react-router-dom';
import {filmsList} from '../../../mocs/film-info.ts';
import {SmallFilmCard} from './small-film-card.tsx';

const mockFilm = filmsList[0];

describe('SmallFilmCard Component', () => {
  const onMouseEnter = vi.fn();
  const onMouseLeave = vi.fn();

  test('renders SmallFilmCard component', () => {
    render(
      <MemoryRouter>
        <SmallFilmCard film={mockFilm} isActive={false} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}/>
      </MemoryRouter>
    );

    const filmCard = screen.getByTestId('small-film-card');
    const linkElement = screen.getByRole('link', {name: mockFilm.name});

    expect(filmCard).toBeInTheDocument();
    expect(linkElement).toBeInTheDocument();
  });

  test('triggers mouseEnter and mouseLeave events', () => {
    render(
      <MemoryRouter>
        <SmallFilmCard film={mockFilm} isActive={false} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}/>
      </MemoryRouter>
    );

    const filmCard = screen.getByTestId('small-film-card');

    fireEvent.mouseEnter(filmCard);
    expect(onMouseEnter).toHaveBeenCalledWith(mockFilm.id);

    fireEvent.mouseLeave(filmCard);
    expect(onMouseLeave).toHaveBeenCalled();
  });

  test('navigates to correct film link', () => {
    render(
      <MemoryRouter>
        <SmallFilmCard film={mockFilm} isActive={false} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}/>
      </MemoryRouter>
    );

    const linkElement = screen.getByRole('link', {name: mockFilm.name});

    fireEvent.click(linkElement);
  });
});
