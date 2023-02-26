import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from 'shared/ui/Button';
import { Input } from 'shared/ui/Input';
import { getClassNames } from 'shared/utils/classNames/getClassNames';
import style from './LoginForm.module.scss';

type LoginFormProps = {
  className?: string;
};

export const LoginForm: FC<LoginFormProps> = (props) => {
  const { className } = props;
  const { t } = useTranslation();

  return (
    <div className={getClassNames(style.loginForm, {}, [className])}>
      <Input
        className={style.input}
        type="text"
        placeholder={t('Имя пользователя')}
      />
      <Input
        className={style.input}
        type="text"
        placeholder={t('Пароль')}
      />

      <Button
        className={style.button}
      >
        {t('Войти')}
      </Button>
    </div>
  );
};
