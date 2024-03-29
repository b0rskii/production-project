import { useTranslation } from 'react-i18next';
import { Page } from '@/3_widgets/Page';
import { I18nNameSpace } from '@/6_shared/utils/i18n/nameSpace';

function AboutPage() {
  const { t } = useTranslation(I18nNameSpace.About);

  return (
    <Page>
      {t('Страница о нас')}
    </Page>
  );
}

export default AboutPage;
