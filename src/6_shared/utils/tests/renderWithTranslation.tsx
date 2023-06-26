import { ReactNode } from 'react';
import { render } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';
import i18nTest from '6_shared/utils/i18n/i18nTest';

export const renderWithTranslation = (component: ReactNode) => (
  render(
    <I18nextProvider i18n={i18nTest}>
      {component}
    </I18nextProvider>,
  )
);
