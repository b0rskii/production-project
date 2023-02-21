import { render, screen } from '@testing-library/react';
import { Button, ButtonTheme } from './Button';

describe('Button', () => {
  it('should render correctly', () => {
    render(
      <Button>Test</Button>,
    );
    expect(screen.getByText(/Test/i)).toBeInTheDocument();
  });

  it('should render correctly with clear theme', () => {
    render(
      <Button theme={ButtonTheme.CLEAR}>Test</Button>,
    );
    expect(screen.getByText(/Test/i)).toHaveClass(ButtonTheme.CLEAR);
  });
});
