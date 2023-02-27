import { FC, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Button, ButtonTheme } from 'shared/ui/Button';
import { Input } from 'shared/ui/Input';
import { getClassNames } from 'shared/utils/classNames/getClassNames';
import { loginSelectors } from '../../model/selectors';
import { loginActions } from '../../model/slice/loginSlice';
import { loginByUserName } from '../../model/services/loginByUserName/loginByUserName';
import style from './LoginForm.module.scss';

type LoginFormProps = {
  className?: string;
};

export const LoginForm: FC<LoginFormProps> = (props) => {
  const { className } = props;
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const {
    username,
    password,
    isLoading,
    error,
  } = useSelector(loginSelectors.getLoginState);

  const usernameChangeHandler = useCallback((value: string) => {
    dispatch(loginActions.setUsername(value));
  }, [dispatch]);

  const passwordChangeHandler = useCallback((value: string) => {
    dispatch(loginActions.setPassword(value));
  }, [dispatch]);

  const loginButtonClickHandler = useCallback(() => {
    dispatch(loginByUserName());
  }, [dispatch]);

  return (
    <div className={getClassNames(style.loginForm, {}, [className])}>
      {error && <span className={style.error}>{error}</span>}
      <Input
        className={style.input}
        type="text"
        placeholder={t('Имя пользователя')}
        value={username}
        onChange={usernameChangeHandler}
      />
      <Input
        className={style.input}
        type="text"
        placeholder={t('Пароль')}
        value={password}
        onChange={passwordChangeHandler}
      />

      <Button
        className={style.button}
        theme={ButtonTheme.OUTLINE}
        onClick={loginButtonClickHandler}
        disabled={isLoading}
      >
        {t('Войти')}
      </Button>
    </div>
  );
};
