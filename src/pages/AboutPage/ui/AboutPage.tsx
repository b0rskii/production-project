import { useTranslation } from 'react-i18next';
import { I18nNameSpace } from 'shared/utils/i18n/nameSpace';

function AboutPage() {
  const { t } = useTranslation(I18nNameSpace.About);

  return (
    <div>
      {t('Страница о нас')}
    </div>
  );
}

export default AboutPage;
