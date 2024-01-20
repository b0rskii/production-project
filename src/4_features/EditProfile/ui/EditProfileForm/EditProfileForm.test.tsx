import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { mockProfile } from '@/5_entities/Profile';
import { Country } from '@/5_entities/Country';
import { Currency } from '@/5_entities/Currency';
import { renderComponent } from '@/6_shared/utils/tests';
import { EditProfileForm } from './EditProfileForm';

const mockHandlers = {
  onInputChange: jest.fn(),
  onAgeChange: jest.fn(),
  onCountryChange: jest.fn(),
  onCurrencyChange: jest.fn(),
};

const render = ({
  profile = mockProfile,
  isUpdating = false,
  validateErrors = null,
  handlers = mockHandlers,
} = {}) => (
  renderComponent(
    <EditProfileForm
      profile={profile}
      isUpdating={isUpdating}
      validateErrors={validateErrors}
      handlers={handlers}
    />,
  )
);

describe('4_features/EditProfileForm.test', () => {
  it('firstname input type', async () => {
    render();

    const typedValue = 'Firstname';

    await userEvent.clear(screen.getByTestId('EditProfileForm.Firstname'));
    await userEvent.type(screen.getByTestId('EditProfileForm.Firstname'), typedValue);

    expect(mockHandlers.onInputChange)
      .toHaveBeenCalledTimes(typedValue.length + 1);
    expect(screen.getByTestId<HTMLInputElement>('EditProfileForm.Firstname').value)
      .toEqual(typedValue);
  });

  it('lastname input type', async () => {
    render();

    const typedValue = 'Lastname';

    await userEvent.clear(screen.getByTestId('EditProfileForm.Lastname'));
    await userEvent.type(screen.getByTestId('EditProfileForm.Lastname'), typedValue);

    expect(mockHandlers.onInputChange)
      .toHaveBeenCalledTimes(typedValue.length + 1);
    expect(screen.getByTestId<HTMLInputElement>('EditProfileForm.Lastname').value)
      .toEqual(typedValue);
  });

  it('username input type', async () => {
    render();

    const typedValue = 'Username';

    await userEvent.clear(screen.getByTestId('EditProfileForm.Username'));
    await userEvent.type(screen.getByTestId('EditProfileForm.Username'), typedValue);

    expect(mockHandlers.onInputChange)
      .toHaveBeenCalledTimes(typedValue.length + 1);
    expect(screen.getByTestId<HTMLInputElement>('EditProfileForm.Username').value)
      .toEqual(typedValue);
  });

  it('age input type', async () => {
    render();

    const typedValue = '50';

    await userEvent.clear(screen.getByTestId('EditProfileForm.Age'));
    await userEvent.type(screen.getByTestId('EditProfileForm.Age'), typedValue);

    expect(mockHandlers.onAgeChange)
      .toHaveBeenCalledTimes(typedValue.length + 1);
    expect(screen.getByTestId<HTMLInputElement>('EditProfileForm.Age').value)
      .toEqual(typedValue);
  });

  it('city input type', async () => {
    render();

    const typedValue = 'City';

    await userEvent.clear(screen.getByTestId('EditProfileForm.City'));
    await userEvent.type(screen.getByTestId('EditProfileForm.City'), typedValue);

    expect(mockHandlers.onInputChange)
      .toHaveBeenCalledTimes(typedValue.length + 1);
    expect(screen.getByTestId<HTMLInputElement>('EditProfileForm.City').value)
      .toEqual(typedValue);
  });

  it('country select change', async () => {
    render();

    const selectedValue = Country.Kazakhstan;

    await userEvent.click(screen.getByTestId('CountrySelect.Button'));
    await userEvent.click(screen.getByText(selectedValue));

    expect(mockHandlers.onCountryChange)
      .toHaveBeenCalledTimes(1);
    expect(screen.getByTestId('CountrySelect.Button'))
      .toHaveTextContent(selectedValue);
  });

  it('currency select change', async () => {
    render();

    const selectedValue = Currency.EUR;

    await userEvent.click(screen.getByTestId('CurrencySelect.Button'));
    await userEvent.click(screen.getByText(selectedValue));

    expect(mockHandlers.onCurrencyChange)
      .toHaveBeenCalledTimes(1);
    expect(screen.getByTestId('CurrencySelect.Button'))
      .toHaveTextContent(selectedValue);
  });

  it('avatar input type', async () => {
    render();

    const typedValue = 'Avatar';

    await userEvent.clear(screen.getByTestId('EditProfileForm.Avatar'));
    await userEvent.type(screen.getByTestId('EditProfileForm.Avatar'), typedValue);

    expect(mockHandlers.onInputChange)
      .toHaveBeenCalledTimes(typedValue.length + 1);
    expect(screen.getByTestId<HTMLInputElement>('EditProfileForm.Avatar').value)
      .toEqual(typedValue);
  });
});
