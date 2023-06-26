import { useTranslation } from 'react-i18next';
import { Page } from '3_widgets/Page';
import { I18nNameSpace } from '6_shared/utils/i18n/nameSpace';

function MainPage() {
  const { t } = useTranslation(I18nNameSpace.Main);

  return (
    <Page>
      {t('Главная страница')}
    </Page>
  );
}

export default MainPage;
