import {render, screen} from '@testing-library/react';
import {MemoryRouter} from 'react-router-dom';
import {Header} from './header.tsx';

describe('Header component', () => {
  test('renders header with logo', () => {
    render(
      <MemoryRouter>
        <Header withoutUserBlock/>
      </MemoryRouter>
    );

    const logo = screen.getByText(/WTW/i);
    expect(logo).toBeInTheDocument();

    const userBlock = screen.queryByTestId('user-block');
    expect(userBlock).not.toBeInTheDocument();
  });

  test('renders header with custom page title and without user block', () => {
    render(
      <MemoryRouter>
        <Header pageTitle={<h2>Your Custom Title</h2>} withoutUserBlock/>
      </MemoryRouter>
    );

    const customTitle = screen.getByText(/Your Custom Title/i);
    expect(customTitle).toBeInTheDocument();

    const userBlock = screen.queryByTestId('user-block');
    expect(userBlock).not.toBeInTheDocument();
  });
});
