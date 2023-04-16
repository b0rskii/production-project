import { useTranslation } from 'react-i18next';
import { I18nNameSpace } from 'shared/utils/i18n/nameSpace';

function MainPage() {
  const { t } = useTranslation(I18nNameSpace.Main);

  return (
    <div>
      {t('Главная страница')}
    </div>
  );
}

export default MainPage;
