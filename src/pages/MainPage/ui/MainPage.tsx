import { useTranslation } from 'react-i18next';
import { Page } from 'widgets/Page';
import { I18nNameSpace } from 'shared/utils/i18n/nameSpace';

function MainPage() {
  const { t } = useTranslation(I18nNameSpace.Main);

  return (
    <Page>
      {t('Главная страница')}
    </Page>
  );
}

export default MainPage;
