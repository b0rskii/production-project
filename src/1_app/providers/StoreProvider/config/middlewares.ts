import { Middleware } from 'redux';

// eslint-disable-next-line no-unused-vars
export const skipThunk: Middleware = (_store) => (next) => (action) => {
  if (action.meta && __PROJECT__ === 'storybook') {
    return;
  }
  // eslint-disable-next-line consistent-return
  return next(action);
};
