import { useTranslation } from 'react-i18next';
import { Page } from '3_widgets/Page';
import { I18nNameSpace } from '6_shared/utils/i18n/nameSpace';

function ArticleEditPage() {
  const { t } = useTranslation(I18nNameSpace.Article);

  return (
    <Page>
      {t('Страница редактирования статьи')}
    </Page>
  );
}

export default ArticleEditPage;
