import { PropsWithChildren, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getClassNames } from '6_shared/utils/classNames';
import { useAsyncReducer } from '6_shared/utils/redux';
import { RoutePath } from '6_shared/config/routing';
import { AppLink, AppLinkTheme } from '6_shared/ui/AppLink';
import { SLICE_NAME, editArticleReducer } from '../../model/slice/editArticleSlice';
import { editArticleSelectors } from '../../model/selectors';
import style from './EditArticleButton.module.scss';

type Props = PropsWithChildren<{
  className?: string;
}>;

export const EditArticleButton = memo((props: Props) => {
  const { className } = props;
  const { t } = useTranslation();
  const { id } = useParams();

  useAsyncReducer(SLICE_NAME, editArticleReducer);

  const canEdit = useSelector(editArticleSelectors.getCanEdit);

  if (!canEdit) {
    return null;
  }

  return (
    <AppLink
      className={getClassNames(style.editArticleButton, {}, [className])}
      theme={AppLinkTheme.OUTLINE}
      to={RoutePath.EDIT_ARTICLE(id as string)}
    >
      {t('Редактировать')}
    </AppLink>
  );
});
