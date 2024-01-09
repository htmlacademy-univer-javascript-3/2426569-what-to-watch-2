import {fireEvent, render, screen} from '@testing-library/react';
import {MemoryRouter, Route, Routes} from 'react-router-dom';
import {RoutesLinks} from '../../routes/route-links.ts';
import {Logo} from './logo.tsx';

describe('Logo', () => {
  test('renders logo with link to main route', () => {
    render(
      <MemoryRouter>
        <Logo/>
      </MemoryRouter>
    );

    const logoLink = screen.getByRole('link', {name: /W T W/i});
    expect(logoLink).toBeInTheDocument();
    expect(logoLink).toHaveAttribute('href', RoutesLinks.Main);
  });

  test('navigates to Main page when logo is clicked', () => {
    render(
      <MemoryRouter initialEntries={['/initial']} initialIndex={0}>
        <Routes>
          <Route path="/initial" element={<Logo/>}/>
        </Routes>
      </MemoryRouter>
    );

    const logoLink = screen.getByTestId('logo-link');
    fireEvent.click(logoLink);

    expect(window.location.pathname).toBe(RoutesLinks.Main);
  });
});
