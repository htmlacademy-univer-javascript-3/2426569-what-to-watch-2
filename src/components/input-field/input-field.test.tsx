
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { InputField } from './input-field.tsx';

describe('InputField', () => {
  test('renders input field with label and placeholder', () => {
    const mockOnChange = vi.fn();
    render(
      <MemoryRouter>
        <InputField
          classPrefix="sample"
          type="text"
          placeholder="Enter Text"
          name="text"
          id="textId"
          value=""
          onChange={mockOnChange}
        />
      </MemoryRouter>
    );

    const inputField = screen.getByPlaceholderText('Enter Text');
    expect(inputField).toBeInTheDocument();

    const label = screen.getByLabelText('Enter Text');
    expect(label).toBeInTheDocument();
  });


  test('triggers onChange event', () => {
    const mockOnChange = vi.fn();
    render(
      <MemoryRouter>
        <InputField
          classPrefix="sample"
          type="text"
          placeholder="Enter Text"
          name="text"
          id="textId"
          value=""
          onChange={mockOnChange}
        />
      </MemoryRouter>
    );

    const inputField = screen.getByPlaceholderText('Enter Text');
    fireEvent.change(inputField, { target: { value: 'Sample Value' } });

    expect(mockOnChange).toHaveBeenCalledTimes(1);
    expect(mockOnChange).toHaveBeenCalledWith(expect.anything());
  });
});
