// Spinner.test.tsx
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { SpinnerWrapper, Spinner } from './spinner-wrapper.tsx';

describe('SpinnerWrapper', () => {
  test('renders children when isLoading is false', () => {
    render(
      <MemoryRouter initialEntries={['/initial']}>
        <SpinnerWrapper isLoading={false}>Children Content</SpinnerWrapper>
      </MemoryRouter>
    );
    const childrenContent = screen.getByText('Children Content');
    expect(childrenContent).toBeInTheDocument();
    const spinner = screen.queryByTestId('spinner');
    expect(spinner).not.toBeInTheDocument();
  });

  test('renders spinner when isLoading is true', () => {
    render(
      <MemoryRouter initialEntries={['/initial']}>
        <SpinnerWrapper isLoading>Children Content</SpinnerWrapper>
      </MemoryRouter>
    );
    const spinner = screen.getByTestId('spinner');
    expect(spinner).toBeInTheDocument();
    const childrenContent = screen.queryByText('Children Content');
    expect(childrenContent).not.toBeInTheDocument();
  });
});

describe('Spinner', () => {
  test('renders spinner without full page styling by default', () => {
    render(
      <MemoryRouter initialEntries={['/initial']}>
        <Spinner />
      </MemoryRouter>
    );
    const spinnerWrapper = screen.getByTestId('spinner');
    expect(spinnerWrapper).toBeInTheDocument();
    expect(spinnerWrapper).not.toHaveClass('spinner-wrapper__full');
  });

  test('renders spinner with full page styling when isFullPage is true', () => {
    render(
      <MemoryRouter initialEntries={['/initial']}>
        <Spinner isFullPage/>
      </MemoryRouter>
    );
    const spinnerWrapper = screen.getByTestId('spinner');
    expect(spinnerWrapper).toBeInTheDocument();
    expect(spinnerWrapper).toHaveClass('spinner-wrapper__full');
  });
});
