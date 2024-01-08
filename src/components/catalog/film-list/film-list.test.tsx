import {fireEvent, render, screen} from '@testing-library/react';
import {MemoryRouter} from 'react-router-dom';
import {expect} from 'vitest';
import {filmsList} from '../../../mocs/film-info.ts';
import {FilmList} from './film-list.tsx';

const mockFilmsData = filmsList;

describe('FilmList Component', () => {
  test('renders film list component', () => {
    render(
      <MemoryRouter initialEntries={['/initial']}>
        <FilmList filmsData={mockFilmsData}/>
      </MemoryRouter>
    );

    const filmListComponent = screen.getByTestId('film-list');
    expect(filmListComponent).toBeInTheDocument();
  });

  test('handles film hover events', () => {
    render(
      <MemoryRouter initialEntries={['/initial']}>
        <FilmList filmsData={mockFilmsData}/>
      </MemoryRouter>
    );

    const filmCards = screen.getAllByTestId('small-film-card');
    expect(filmCards).length(mockFilmsData.length);

    const filmCard = filmCards[0];
    fireEvent.mouseEnter(filmCard);

    expect(filmCard).toHaveAttribute('data-active');

    fireEvent.mouseLeave(filmCard);

    expect(filmCard).not.toHaveClass('data-active');
  });

  test('renders film list with empty array', () => {
    render(
      <MemoryRouter initialEntries={['/initial']}>
        <FilmList filmsData={[]}/>
      </MemoryRouter>
    );

    const notFoundMessage = screen.getByText('Films not found');
    expect(notFoundMessage).toBeInTheDocument();
  });

  test('renders film list with maximum specified length', () => {
    const maxLength = 1;
    render(
      <MemoryRouter initialEntries={['/initial']}>
        <FilmList filmsData={mockFilmsData} maxLength={maxLength}/>
      </MemoryRouter>
    );

    // Check if only one film card is rendered
    const filmCards = screen.getAllByTestId('small-film-card');
    expect(filmCards).toHaveLength(1);
  });
});
