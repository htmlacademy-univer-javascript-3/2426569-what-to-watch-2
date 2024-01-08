import { render, screen, fireEvent } from '@testing-library/react';
import { GenreItem } from './genre-item.tsx';

describe('GenreItem', () => {
  test('renders genre item component', () => {
    render(<GenreItem genre="Action" isActive={false} onClick={vi.fn()} />);

    const genreItem = screen.getByTestId('catalog__genres-item-Action');
    expect(genreItem).toBeInTheDocument();

    const genreLink = screen.getByText('Action');
    expect(genreLink).toBeInTheDocument();

    expect(genreItem).not.toHaveClass('catalog__genres-item--active');
  });

  test('handles click event on genre item', () => {
    const onClickMock = vi.fn();
    render(<GenreItem genre="Action" isActive={false} onClick={onClickMock} />);

    const genreItem = screen.getByTestId('catalog__genres-item-Action');
    fireEvent.click(genreItem);

    expect(onClickMock).toHaveBeenCalledTimes(1);
  });

  test('renders active genre item', () => {
    render(<GenreItem genre="Action" isActive onClick={vi.fn()} />);

    const genreItem = screen.getByTestId('catalog__genres-item-Action');
    expect(genreItem).toHaveClass('catalog__genres-item--active');
  });
});
