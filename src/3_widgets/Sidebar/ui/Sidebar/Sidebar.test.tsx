import { fireEvent, screen } from '@testing-library/react';
import { renderComponent } from '@/6_shared/utils/tests';
import { Sidebar } from './Sidebar';

describe('Sidebar', () => {
  it('should render correctly', () => {
    renderComponent(<Sidebar />);
    expect(screen.getByTestId('sidebar')).toBeInTheDocument();
  });

  it('should toggle sidebar mode on toggler click', () => {
    renderComponent(<Sidebar />);

    const toggler = screen.getByTestId('sidebar-toggler');
    fireEvent.click(toggler);

    expect(screen.getByTestId('sidebar')).toHaveClass('collapsed');
  });
});
