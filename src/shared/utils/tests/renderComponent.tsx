import { ReactNode } from 'react';
import { render } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';
import { MemoryRouter } from 'react-router-dom';
import { StateSchema, StoreProvider } from 'app/providers/StoreProvider';
import i18nTest from 'shared/utils/i18n/i18nTest';

type RenderComponentOptions = {
  route?: string;
  initialState?: DeepPartial<StateSchema>;
};

export const renderComponent = (component: ReactNode, options: RenderComponentOptions = {}) => {
  const {
    route = '/',
    initialState,
  } = options;

  return render(
    <MemoryRouter initialEntries={[route]}>
      <StoreProvider initialState={initialState as StateSchema}>
        <I18nextProvider i18n={i18nTest}>
          {component}
        </I18nextProvider>
      </StoreProvider>
    </MemoryRouter>,
  );
};
