import { ReactNode } from 'react';
import { render } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';
import { MemoryRouter } from 'react-router-dom';
import i18nTest from 'shared/utils/i18n/i18nTest';

export type RenderComponentOptions = {
  route?: string;
};

export const renderComponent = (component: ReactNode, options: RenderComponentOptions = {}) => {
  const { route = '/' } = options;

  return render(
    <MemoryRouter initialEntries={[route]}>
      <I18nextProvider i18n={i18nTest}>
        {component}
      </I18nextProvider>
    </MemoryRouter>,
  );
};
