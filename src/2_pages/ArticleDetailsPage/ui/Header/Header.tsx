import { PropsWithChildren, memo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { EditArticleButton } from '4_features/EditArticle';
import { I18nNameSpace } from '6_shared/utils/i18n/nameSpace';
import { RoutePath } from '6_shared/config/routing';
import { Button, ButtonTheme } from '6_shared/ui/Button';
import { Stack } from '6_shared/ui/Stack';

type Props = PropsWithChildren<{
  className?: string;
}>;

export const Header = memo((props: Props) => {
  const { className } = props;
  const { t } = useTranslation(I18nNameSpace.Article);
  const navigate = useNavigate();

  const toArticlesListButtonHandler = useCallback(() => {
    navigate(RoutePath.ARTICLES());
  }, [navigate]);

  return (
    <Stack Tag="section" justify="space-between" className={className}>
      <Button
        theme={ButtonTheme.OUTLINE}
        onClick={toArticlesListButtonHandler}
      >
        {t('К списку статей')}
      </Button>
      <EditArticleButton />
    </Stack>
  );
});
