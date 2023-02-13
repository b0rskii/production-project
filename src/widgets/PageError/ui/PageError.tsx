import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { getClassNames } from 'shared/utils/classNames/getClassNames';
import { Button } from 'shared/ui/Button';
import style from './PageError.module.scss';

type PageErrorProps = {
  className?: string;
};

export const PageError: FC<PageErrorProps> = (props) => {
  const { className } = props;
  const { t } = useTranslation();
  const navigate = useNavigate();

  const onRefreshButtonClick = () => {
    navigate(0);
  };

  return (
    <div className={getClassNames(style.pageError, {}, [className])}>
      <p>{t('Произошла непредвиденная ошибка')}</p>
      <Button onClick={onRefreshButtonClick}>{t('Обновить страницу')}</Button>
    </div>
  );
};
