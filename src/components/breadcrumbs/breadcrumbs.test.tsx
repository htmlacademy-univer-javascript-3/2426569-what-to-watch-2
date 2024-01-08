import {fireEvent, render, screen} from '@testing-library/react';
import {MemoryRouter, Route, Routes} from 'react-router-dom';
import {RoutesLinks} from '../../routes/route-links';
import {Breadcrumbs} from './breadcrumbs';

const id = '123';
const title = 'Movie Title';

describe('Breadcrumbs', () => {

  test('renders Breadcrumbs component with links', () => {
    const {unmount} = render(
      <MemoryRouter>
        <Routes>
          <Route path="/films/:id" element={<div data-testid="film-page" />} />
          <Route path="/films/:id/review" element={<div data-testid="add-review-page" />} />
          <Route path="*" element={<Breadcrumbs id={id} title={title}/>} />
        </Routes>
      </MemoryRouter>
    );

    const filmLink = screen.getByRole('link', {name: title});
    const addReviewLink = screen.getByRole('link', {name: 'Add review'});

    expect(filmLink).toBeInTheDocument();
    expect(addReviewLink).toBeInTheDocument();
    expect(filmLink).toHaveAttribute('href', RoutesLinks.Film.replace(':id', id));
    expect(addReviewLink).toHaveAttribute('href', RoutesLinks.AddReview.replace(':id', id));
    unmount();
  });

  test('navigates to correct routes when links are clicked', () => {
    const {unmount} = render(
      <MemoryRouter>
        <Routes>
          <Route path="/films/:id" element={<div data-testid="film-page" />} />
          <Route path="/films/:id/review" element={<div data-testid="add-review-page" />} />
        </Routes>
        <Breadcrumbs id={id} title={title}/>
      </MemoryRouter>
    );

    const filmLink = screen.getByRole('link', {name: title});
    const addReviewLink = screen.getByRole('link', {name: 'Add review'});

    fireEvent.click(filmLink);
    expect(screen.getByTestId('film-page')).toBeInTheDocument();

    fireEvent.click(addReviewLink);
    expect(screen.getByTestId('add-review-page')).toBeInTheDocument();
    unmount();
  });
});
