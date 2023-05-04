import { useTranslation } from 'react-i18next';
import { I18nNameSpace } from 'shared/utils/i18n/nameSpace';
import { Page } from 'shared/ui/Page';

function MainPage() {
  const { t } = useTranslation(I18nNameSpace.Main);

  return (
    <Page>
      {t('Главная страница')}
    </Page>
  );
}

export default MainPage;
