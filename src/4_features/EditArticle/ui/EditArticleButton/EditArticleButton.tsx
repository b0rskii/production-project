import { PropsWithChildren, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { getClassNames } from '6_shared/utils/classNames';
import { useAsyncReducer } from '6_shared/utils/redux';
import { Button, ButtonTheme } from '6_shared/ui/Button';
import { SLICE_NAME, editArticleReducer } from '../../model/slice/editArticleSlice';
import { editArticleSelectors } from '../../model/selectors';
import style from './EditArticleButton.module.scss';

type Props = PropsWithChildren<{
  className?: string;
}>;

export const EditArticleButton = memo((props: Props) => {
  const { className } = props;
  const { t } = useTranslation();

  useAsyncReducer(SLICE_NAME, editArticleReducer);

  const canEdit = useSelector(editArticleSelectors.getCanEdit);

  if (!canEdit) {
    return null;
  }

  return (
    <Button
      className={getClassNames(style.editArticleButton, {}, [className])}
      theme={ButtonTheme.OUTLINE}
    >
      {t('Редактировать')}
    </Button>
  );
});
