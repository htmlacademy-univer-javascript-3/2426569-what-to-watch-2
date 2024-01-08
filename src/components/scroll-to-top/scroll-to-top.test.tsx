import {render} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {act} from 'react-dom/test-utils';
import {MemoryRouter} from 'react-router-dom';
import ScrollToTop from './scroll-to-top';

describe('ScrollToTop Tests', () => {
  it('should scroll to top on route change', () => {
    const history = createMemoryHistory();
    const {container, unmount} = render(
      <MemoryRouter initialEntries={['/initial']}>
        <ScrollToTop/>
      </MemoryRouter>
    );

    expect(container.firstChild).toBeNull();

    act(() => {
      history.push('/new-path');
    });

    expect(container.firstChild).toBeNull();

    expect(window.scrollY).toBe(0);
    unmount();
  });
});
