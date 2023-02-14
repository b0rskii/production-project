import { fireEvent, screen } from '@testing-library/react';
import {
  renderWithTranslation,
} from 'shared/utils/tests/renderWithTranslation/renderWithTranslation';
import { Sidebar } from './Sidebar';

describe('Sidebar', () => {
  it('should render correctly', () => {
    renderWithTranslation(<Sidebar />);
    expect(screen.getByTestId('sidebar')).toBeInTheDocument();
  });

  it('should toggle sidebar mode on toggler click', () => {
    renderWithTranslation(<Sidebar />);

    const toggler = screen.getByTestId('sidebar-toggler');
    fireEvent.click(toggler);

    expect(screen.getByTestId('sidebar')).toHaveClass('collapsed');
  });
});
