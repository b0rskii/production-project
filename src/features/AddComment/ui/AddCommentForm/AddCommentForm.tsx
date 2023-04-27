import { PropsWithChildren, memo, useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { getClassNames } from 'shared/utils/classNames';
import { useAppDispatch, useAsyncReducer } from 'shared/utils/redux';
import { Timer } from 'shared/const/timers';
import { Input } from 'shared/ui/Input';
import { Button, ButtonTheme } from 'shared/ui/Button';
import { Text, TextTheme } from 'shared/ui/Text';
import {
  SLICE_NAME, addCommentReducer, addCommentActions,
} from '../../model/slice/addCommentSlice';
import { addCommentSelectors } from '../../model/selectors';
import style from './AddCommentForm.module.scss';

type AddCommentFormProps = PropsWithChildren<{
  className?: string;
  onSendComment: () => void;
}>;

export const AddCommentForm = memo((props: AddCommentFormProps) => {
  const { className, onSendComment } = props;
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  useAsyncReducer(SLICE_NAME, addCommentReducer);

  const text = useSelector(addCommentSelectors.getText);
  const isLoading = useSelector(addCommentSelectors.getIsLoading);
  const error = useSelector(addCommentSelectors.getError);

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        dispatch(addCommentActions.setError(null));
      }, Timer.NOTIFICATION);
    }
  }, [dispatch, error]);

  const textChangeHandler = useCallback((value: string) => {
    dispatch(addCommentActions.setText(value));
  }, [dispatch]);

  return (
    <div className={getClassNames(style.addCommentForm, {}, [className])}>
      {error && (
        <Text
          className={style.error}
          text={t('Не удалось отправить комментарий')}
          theme={TextTheme.ERROR}
        />
      )}
      <Input
        className={style.input}
        value={text}
        onChange={textChangeHandler}
        placeholder={t('Введите комментарий')}
        size={text.length}
        disabled={isLoading}
      />
      <Button
        theme={ButtonTheme.OUTLINE}
        onClick={onSendComment}
        disabled={isLoading}
      >
        {isLoading ? t('Отправка...') : t('Отправить')}
      </Button>
    </div>
  );
});
