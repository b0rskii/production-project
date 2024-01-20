import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderComponent } from '@/6_shared/utils/tests';
import { EditProfileButton } from './EditProfileButton';

describe('4_features/EditProfileButton.test', () => {
  beforeEach(() => {
    renderComponent(<EditProfileButton />);
  });

  it('edit button click', async () => {
    await userEvent.click(screen.getByTestId('EditProfileButton.Edit'));

    expect(screen.queryByTestId('EditProfileButton.Edit')).not.toBeInTheDocument();
    expect(screen.getByTestId('EditProfileButton.CancelEdit')).toBeInTheDocument();
    expect(screen.getByTestId('EditProfileButton.Save')).toBeInTheDocument();
  });

  it('cancel button click', async () => {
    await userEvent.click(screen.getByTestId('EditProfileButton.Edit'));
    await userEvent.click(screen.getByTestId('EditProfileButton.CancelEdit'));

    expect(screen.getByTestId('EditProfileButton.Edit')).toBeInTheDocument();
    expect(screen.queryByTestId('EditProfileButton.CancelEdit')).not.toBeInTheDocument();
    expect(screen.queryByTestId('EditProfileButton.Save')).not.toBeInTheDocument();
  });
});
