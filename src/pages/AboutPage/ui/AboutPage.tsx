import { useTranslation } from 'react-i18next';
import { I18nNameSpace } from 'shared/utils/i18n/nameSpace';
import { Page } from 'shared/ui/Page';

function AboutPage() {
  const { t } = useTranslation(I18nNameSpace.About);

  return (
    <Page>
      {t('Страница о нас')}
    </Page>
  );
}

export default AboutPage;
