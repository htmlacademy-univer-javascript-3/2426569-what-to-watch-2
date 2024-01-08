import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Tabs } from './tabs.tsx';

describe('Tabs', () => {
  it('should render tabs correctly', () => {
    render(
      <MemoryRouter>
        <Tabs active="Overview" />
      </MemoryRouter>
    );

    const overview = screen.getByText('Overview');
    const details = screen.getByText('Details');
    const reviews = screen.getByText('Reviews');

    expect(overview).toBeInTheDocument();
    expect(details).toBeInTheDocument();
    expect(reviews).toBeInTheDocument();

    const overviewTab = screen.getByTestId('tab-header-Overview');
    const detailsTab = screen.getByTestId('tab-header-Details');
    const reviewsTab = screen.getByTestId('tab-header-Reviews');

    expect(overviewTab).toHaveClass('film-nav__item--active');
    expect(detailsTab).not.toHaveClass('film-nav__item--active');
    expect(reviewsTab).not.toHaveClass('film-nav__item--active');
  });

  test('calls onClick when a tab is clicked', () => {
    const mockOnClick = vi.fn();

    render(
      <MemoryRouter>
        <Tabs active="Overview" onClick={mockOnClick} />
      </MemoryRouter>
    );

    const tab2 = screen.getByText('Details');
    fireEvent.click(tab2);

    expect(mockOnClick).toHaveBeenCalledWith('Details');
  });
});
