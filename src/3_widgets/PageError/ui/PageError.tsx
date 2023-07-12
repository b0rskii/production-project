import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { getClassNames } from '6_shared/utils/classNames/getClassNames';
import { Button, ButtonTheme } from '6_shared/ui/Button';
import { Stack } from '6_shared/ui/Stack';
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
    <Stack
      className={getClassNames(style.pageError, {}, [className])}
      mode="v"
      justify="center"
      gap="l"
    >
      <p>{t('Произошла непредвиденная ошибка')}</p>
      <Button
        onClick={onRefreshButtonClick}
        theme={ButtonTheme.OUTLINE}
      >
        {t('Обновить страницу')}
      </Button>
    </Stack>
  );
};
