import { useTranslation } from 'react-i18next';
import { Page } from '@/3_widgets/Page';
import { I18nNameSpace } from '@/6_shared/utils/i18n/nameSpace';

function AdminPanelPage() {
  const { t } = useTranslation(I18nNameSpace.AdminPanel);

  return <Page data-testid="AdminPanelPage">{t('Панель администратора')}</Page>;
}

export default AdminPanelPage;
