import {fireEvent, render, screen} from '@testing-library/react';
import {MemoryRouter, Route, Routes} from 'react-router-dom';
import {Footer} from './footer.tsx';

describe('Footer', () => {
  test('renders footer with logo and copyright', () => {
    render(
      <MemoryRouter>
        <Footer/>
      </MemoryRouter>
    );

    const footer = screen.getByTestId('page-footer');
    expect(footer).toBeInTheDocument();

    const logoLink = screen.getByTestId('logo-link');
    expect(logoLink).toBeInTheDocument();

    const logoLetters = screen.getAllByTestId('logo-letter');
    expect(logoLetters).toHaveLength(3);
    expect(logoLetters[0]).toHaveTextContent('W');
    expect(logoLetters[1]).toHaveTextContent('T');
    expect(logoLetters[2]).toHaveTextContent('W');

    const copyrightText = screen.getByText('© 2023 What to watch Ltd.');
    expect(copyrightText).toBeInTheDocument();
  });

  test('navigates to Main page when logo is clicked', () => {
    render(
      <MemoryRouter initialEntries={['/initial']} initialIndex={0}>
        <Routes>
          <Route path="/initial" element={<Footer/>}/>
        </Routes>
      </MemoryRouter>
    );

    const logoLink = screen.getByTestId('logo-link');
    fireEvent.click(logoLink);

    expect(window.location.pathname).toBe('/');
  });
});
