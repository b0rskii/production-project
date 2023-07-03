import { PropsWithChildren, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { getClassNames } from '6_shared/utils/classNames';
import { RoutePath } from '6_shared/config/routing';
import { I18nNameSpace } from '6_shared/utils/i18n/nameSpace';
import { AppLink, AppLinkTheme } from '6_shared/ui/AppLink';

type Props = PropsWithChildren<{
  className?: string;
}>;

export const CreateArticleButton = memo((props: Props) => {
  const { className } = props;
  const { t } = useTranslation(I18nNameSpace.Article);

  return (
    <AppLink
      className={getClassNames('', {}, [className])}
      to={RoutePath.CREATE_ARTICLE()}
      theme={AppLinkTheme.PRIMARY_INVERTED}
    >
      {t('Создать статью')}
    </AppLink>
  );
});
