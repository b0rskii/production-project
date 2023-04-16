import { useTranslation } from 'react-i18next';
import { TranslationNameSpace } from 'shared/utils/i18n';

function MainPage() {
  const { t } = useTranslation(TranslationNameSpace.Main);

  return (
    <div>
      {t('Главная страница')}
    </div>
  );
}

export default MainPage;
