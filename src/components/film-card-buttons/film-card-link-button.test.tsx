import {fireEvent, render, screen} from '@testing-library/react';
import {MemoryRouter, Route, Routes} from 'react-router-dom';
import {FilmCardButton, FilmCardLinkButton} from './film-card-link-button.tsx';

describe('FilmCardButton', () => {
  test('renders FilmCardButton with correct content', () => {
    render(
      <FilmCardButton icon={<span>Icon</span>} onClick={vi.fn()} title="Click me" classNames="custom-class">
        Children
      </FilmCardButton>
    );

    const button = screen.getByRole('button');
    const icon = screen.getByText('Icon');
    const title = screen.getByText('Click me');
    const children = screen.getByText('Children');

    expect(button).toHaveClass('btn film-card__button custom-class');
    expect(icon).toBeInTheDocument();
    expect(title).toBeInTheDocument();
    expect(children).toBeInTheDocument();
  });

  test('calls onClick when button is clicked', () => {
    const mockOnClick = vi.fn();
    render(<FilmCardButton onClick={mockOnClick} title="Click me"/>);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(mockOnClick).toHaveBeenCalled();
  });
});

describe('FilmCardLinkButton', () => {
  test('renders FilmCardLinkButton with correct content', () => {
    render(
      <MemoryRouter>
        <FilmCardLinkButton toLink="/some-page" icon={<span>Icon</span>} title="Go to page" classNames="custom-class">
          Children
        </FilmCardLinkButton>
      </MemoryRouter>
    );

    const button = screen.getByRole('button');
    const icon = screen.getByText('Icon');
    const title = screen.getByText('Go to page');
    const children = screen.getByText('Children');

    expect(button).toHaveClass('btn film-card__button custom-class');
    expect(icon).toBeInTheDocument();
    expect(title).toBeInTheDocument();
    expect(children).toBeInTheDocument();
  });

  test('navigates to the specified link when button is clicked', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/some-page" element={<div>Some Page</div>}></Route>
          <Route path="*" element={<FilmCardLinkButton toLink="/some-page" title="Click me"/>}/>
        </Routes>
      </MemoryRouter>
    );

    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(screen.getByText('Some Page')).toBeInTheDocument();
  });
});
