import { FormEvent, PropsWithChildren, memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { getClassNames } from '@/6_shared/utils/classNames';
import { useAppDispatch, useAsyncReducer } from '@/6_shared/utils/redux';
import { Input } from '@/6_shared/ui/Input';
import { Button, ButtonTheme } from '@/6_shared/ui/Button';
import {
  addCommentReducer,
  addCommentActions,
} from '../../model/slice/addCommentSlice';
import { SLICE_NAME } from '../../model/const';
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

  const textChangeHandler = useCallback(
    (value: string) => {
      dispatch(addCommentActions.setText(value));
    },
    [dispatch]
  );

  const formSubmitHandler = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    onSendComment();
  };

  return (
    <form
      className={getClassNames(style.addCommentForm, {}, [className])}
      onSubmit={formSubmitHandler}
      data-testid="ArticleAddCommentForm"
    >
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
        disabled={isLoading || !text.length}
        type="submit"
      >
        {isLoading ? t('Отправка...') : t('Отправить')}
      </Button>
    </form>
  );
});
