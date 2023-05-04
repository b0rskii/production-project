import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { ErrorBoundary } from 'app/providers/ErrorBoundary';
import { StoreProvider } from 'app/providers/StoreProvider';
import { LocalStorageSync } from 'app/syncs/LocalStorageSync';
import { App } from 'app/App';
import { ThemeProvider } from 'shared/utils/theme';
import 'app/styles/index.scss';

import 'shared/utils/i18n';

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

// TODO Семантика
// TODO Уведомления
// TODO Добавить в ошибки кнопку повторить запрос
