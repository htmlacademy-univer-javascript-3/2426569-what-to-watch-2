
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Icon } from './icon';

describe('Icon', () => {
  test('renders icon with specified width, height, and xlinkHref', () => {
    render(
      <MemoryRouter>
        <Icon width="50" height="50" xlinkHref="#sampleIcon" />
      </MemoryRouter>
    );

    const icon = screen.getByTestId('icon');
    expect(icon).toBeInTheDocument();

    expect(icon).toHaveAttribute('width', '50');
    expect(icon).toHaveAttribute('height', '50');

    const useElement = screen.getByTestId('use');
    expect(useElement).toHaveAttribute('xlink:href', '#sampleIcon');
  });
});
