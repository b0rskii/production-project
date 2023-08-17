import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Page } from '3_widgets/Page';
import { getClassNames } from '6_shared/utils/classNames/getClassNames';
import style from './ForbiddenPage.module.scss';

type Props = {
  className?: string;
};

const ForbiddenPage: FC<Props> = (props) => {
  const { className } = props;
  const { t } = useTranslation();

  return (
    <Page className={getClassNames(style.forbidden, {}, [className])}>
      {t('Нет доступа')}
    </Page>
  );
};

export default ForbiddenPage;
