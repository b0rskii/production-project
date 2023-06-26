import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { ErrorBoundary } from '1_app/providers/ErrorBoundary';
import { StoreProvider } from '1_app/providers/StoreProvider';
import { LocalStorageSync } from '1_app/syncs/LocalStorageSync';
import { App } from '1_app/App';
import { ThemeProvider } from '6_shared/utils/theme';
import '1_app/styles/index.scss';

import '6_shared/utils/i18n';

render(
  <BrowserRouter>
    <StoreProvider>
      <ErrorBoundary>
        <ThemeProvider>
          <App />
          <LocalStorageSync />
        </ThemeProvider>
      </ErrorBoundary>
    </StoreProvider>
  </BrowserRouter>,
  document.querySelector('#root'),
);
