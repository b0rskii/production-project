import { useTranslation } from 'react-i18next';
import { TranslationNameSpace } from 'shared/utils/i18n';

function AboutPage() {
  const { t } = useTranslation(TranslationNameSpace.About);

  return (
    <div>
      {t('Страница о нас')}
    </div>
  );
}

export default AboutPage;
