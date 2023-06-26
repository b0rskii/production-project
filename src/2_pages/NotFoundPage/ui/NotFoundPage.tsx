import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Page } from '3_widgets/Page';
import { getClassNames } from '6_shared/utils/classNames/getClassNames';
import style from './NotFoundPage.module.scss';

type NotFoundProps = {
  className?: string;
};

export const NotFoundPage: FC<NotFoundProps> = (props) => {
  const { className } = props;
  const { t } = useTranslation();

  return (
    <Page className={getClassNames(style.notFound, {}, [className])}>
      {t('Страница не найдена')}
    </Page>
  );
};
