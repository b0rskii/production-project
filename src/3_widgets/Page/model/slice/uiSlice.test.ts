import { uiReducer, uiActions } from './uiSlice';
import { UISchema } from '../types/uiSchema';

describe('uiSlice', () => {
  it('setScrollData action when empty state', () => {
    const state = { scrollData: {} };
    const payload = { path: '/path', scrollPosition: 500 };

    expect(uiReducer(state as UISchema, uiActions.setScrollData(payload)))
      .toEqual({
        ...state,
        scrollData: { [payload.path]: payload.scrollPosition },
      });
  });

  it('setScrollData action when state already have data', () => {
    const state = { scrollData: { '/path1': 500 } };
    const payload = { path: '/path2', scrollPosition: 1000 };

    expect(uiReducer(state as UISchema, uiActions.setScrollData(payload)))
      .toEqual({
        ...state,
        scrollData: { ...state.scrollData, [payload.path]: payload.scrollPosition },
      });
  });
});
