import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { getClassNames } from 'shared/utils/classNames/getClassNames';
import { Page } from 'shared/ui/Page';
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
