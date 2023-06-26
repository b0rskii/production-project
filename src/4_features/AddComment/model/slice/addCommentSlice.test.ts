import { sendArticleComment } from '../services/sendArticleComment/sendArticleComment';
import { AddCommentSchema } from '../types/addCommentSchema';
import { addCommentReducer, addCommentActions } from './addCommentSlice';

describe('addCommentSlice', () => {
  it('should set text to payload value', () => {
    const NEW_TEXT = 'some text';
    const state: DeepPartial<AddCommentSchema> = {
      text: '',
    };

    expect(addCommentReducer(state as AddCommentSchema, addCommentActions.setText(NEW_TEXT)))
      .toEqual({
        text: NEW_TEXT,
      });
  });

  it('should set error to payload value', () => {
    const VALUE = 'error';
    const state: DeepPartial<AddCommentSchema> = {
      error: null,
    };

    expect(addCommentReducer(state as AddCommentSchema, addCommentActions.setError(VALUE)))
      .toEqual({
        error: VALUE,
      });
  });

  it('sendArticleComment pending', () => {
    const state: DeepPartial<AddCommentSchema> = {
      text: 'comment text',
      isLoading: false,
      error: 'error',
    };

    expect(addCommentReducer(state as AddCommentSchema, sendArticleComment.pending))
      .toEqual({
        text: 'comment text',
        isLoading: true,
        error: null,
      });
  });

  it('sendArticleComment fulfilled', () => {
    const state: DeepPartial<AddCommentSchema> = {
      text: 'comment text',
      isLoading: true,
      error: 'error',
    };

    expect(addCommentReducer(state as AddCommentSchema, sendArticleComment.fulfilled))
      .toEqual({
        text: '',
        isLoading: false,
        error: null,
      });
  });

  it('sendArticleComment rejected', () => {
    const state: DeepPartial<AddCommentSchema> = {
      isLoading: true,
      error: null,
    };

    const payload = 'error';

    expect(addCommentReducer(
      state as AddCommentSchema,
      { type: sendArticleComment.rejected.type, payload },
    ))
      .toEqual({
        isLoading: false,
        error: payload,
      });
  });
});
