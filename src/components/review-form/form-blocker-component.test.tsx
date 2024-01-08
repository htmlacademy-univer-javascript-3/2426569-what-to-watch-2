import {fireEvent, render, screen} from '@testing-library/react';
import {MemoryRouter} from 'react-router-dom';
import {WrapperBlocker} from './form-blocker-component.tsx';

describe('WrapperBlocker', () => {
  test('renders children when isBlock is false', () => {
    render(
      <MemoryRouter>
        <WrapperBlocker isBlock={false}>Children Content</WrapperBlocker>
      </MemoryRouter>
    );

    const childrenContent = screen.getByText('Children Content');
    expect(childrenContent).toBeInTheDocument();

    const blockedWrapper = screen.queryByTestId('blocked-wrapper');
    expect(blockedWrapper).not.toBeInTheDocument();
  });

  test('renders blocked wrapper when isBlock is true', () => {
    render(
      <MemoryRouter>
        <WrapperBlocker isBlock>Children Content</WrapperBlocker>
      </MemoryRouter>
    );

    const blockedWrapper = screen.getByTestId('blocked-wrapper');
    expect(blockedWrapper).toBeInTheDocument();

    const childrenContent = screen.queryByText('Children Content');
    expect(childrenContent).toBeInTheDocument();
  });

  test('prevents keydown event propagation in blocked wrapper', () => {
    const mockKeyDown = vi.fn();
    render(
      <MemoryRouter>
        <WrapperBlocker isBlock>
          <div data-testid="inner-content" onKeyDown={mockKeyDown}>Inner Content</div>
        </WrapperBlocker>
      </MemoryRouter>
    );

    const blockedWrapper = screen.getByTestId('blocked-wrapper');
    fireEvent.keyDown(blockedWrapper, {key: 'Enter'});

    expect(mockKeyDown).not.toHaveBeenCalled();
  });
});
