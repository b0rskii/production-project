import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { getClassNames } from 'shared/utils/classNames';
import { Button, ButtonTheme } from 'shared/ui/Button';

type LangSwitcherProps = {
  className?: string;
};

export const LangSwitcher: FC<LangSwitcherProps> = (props) => {
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
};
