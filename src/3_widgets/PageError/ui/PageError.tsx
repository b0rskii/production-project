import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { getClassNames } from '@/6_shared/utils/classNames/getClassNames';
import { Button, ButtonTheme } from '@/6_shared/ui/Button';
import style from './PageError.module.scss';

type PageErrorProps = {
  className?: string;
};

export const PageError = (props: PageErrorProps) => {
  const { className } = props;
  const { t } = useTranslation();
  const navigate = useNavigate();

  const onRefreshButtonClick = () => {
    navigate(0);
  };

  return (
    <div className={getClassNames(style.pageError, {}, [className])}>
      <p>{t('Произошла непредвиденная ошибка')}</p>
      <Button
        onClick={onRefreshButtonClick}
        theme={ButtonTheme.OUTLINE}
      >
        {t('Обновить страницу')}
      </Button>
    </div>
  );
};
