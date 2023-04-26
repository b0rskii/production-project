import { PropsWithChildren, memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { getClassNames } from 'shared/utils/classNames';
import { useAppDispatch, useAsyncReducer } from 'shared/utils/redux';
import { Input } from 'shared/ui/Input';
import { Button, ButtonTheme } from 'shared/ui/Button';
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

  const textChangeHandler = useCallback((value: string) => {
    dispatch(addCommentActions.setText(value));
  }, [dispatch]);

  return (
    <div className={getClassNames(style.addCommentForm, {}, [className])}>
      <Input
        className={style.input}
        value={text}
        onChange={textChangeHandler}
        placeholder={t('Введите комментарий')}
        size={text.length}
      />
      <Button
        theme={ButtonTheme.OUTLINE}
        onClick={onSendComment}
      >
        {t('Отправить')}
      </Button>
    </div>
  );
});
