import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { Page } from '@/3_widgets/Page';
import { Text } from '@/6_shared/ui/Text';

function ArticleEditPage() {
  const { t } = useTranslation();
  const { id } = useParams();

  const isEdit = Boolean(id);

  return (
    <Page data-testid="ArticleEditPage">
      <Text title={isEdit ? t('Редактировать') : t('Создать')} />
    </Page>
  );
}

export default ArticleEditPage;
