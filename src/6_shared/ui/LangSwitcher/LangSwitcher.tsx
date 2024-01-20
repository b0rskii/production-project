import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { getClassNames } from '@/6_shared/utils/classNames';
import { Button, ButtonTheme } from '@/6_shared/ui/Button';

type LangSwitcherProps = {
  className?: string;
};

export const LangSwitcher = memo((props: LangSwitcherProps) => {
  const { className } = props;
  const { t, i18n } = useTranslation();

  const onButtonClick = () => {
    i18n.changeLanguage(i18n.language === 'ru' ? 'en' : 'ru');
  };

  return (
    <Button
      className={getClassNames('', {}, [className])}
      theme={ButtonTheme.CLEAR_INVERTED}
      onClick={onButtonClick}
    >
      {t('Язык')}
    </Button>
  );
});
