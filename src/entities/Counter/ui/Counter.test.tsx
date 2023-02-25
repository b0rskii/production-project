import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { StateSchema } from 'app/providers/StoreProvider';
import { renderComponent } from 'shared/utils/tests/renderComponent';
import { Counter } from './Counter';

const VALUE = 10;
const initialState: StateSchema = { counter: { value: VALUE } };

describe('Counter', () => {
  it('should render correctly', () => {
    renderComponent(<Counter />, { initialState });

    expect(screen.getByTestId('counter')).toBeInTheDocument();
    expect(screen.getByTestId('counter-value')).toHaveTextContent(String(VALUE));
  });

  it('increment', () => {
    renderComponent(<Counter />, { initialState });

    const incrementButton = screen.getByTestId('counter-increment-button');

    userEvent.click(incrementButton);

    expect(screen.getByTestId('counter-value')).toHaveTextContent(String(VALUE + 1));
  });

  it('decrement', () => {
    renderComponent(<Counter />, { initialState });

    const decrementButton = screen.getByTestId('counter-decrement-button');

    userEvent.click(decrementButton);

    expect(screen.getByTestId('counter-value')).toHaveTextContent(String(VALUE - 1));
  });
});
