import { FC, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Button, ButtonTheme } from 'shared/ui/Button';
import { Text, TextTheme } from 'shared/ui/Text';
import { Input } from 'shared/ui/Input';
import { getClassNames } from 'shared/utils/classNames';
import { useAppDispatch, useAsyncReducer } from 'shared/utils/redux';
import { loginSelectors } from '../../model/selectors';
import { loginActions, loginReducer, NAME } from '../../model/slice/loginSlice';
import { loginByUserName } from '../../model/services/loginByUserName/loginByUserName';
import style from './LoginForm.module.scss';

export type LoginFormProps = {
  className?: string;
  onSuccess: () => void;
};

const LoginForm: FC<LoginFormProps> = (props) => {
  const { className, onSuccess } = props;
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  useAsyncReducer(NAME, loginReducer);

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

  const loginButtonClickHandler = useCallback(async () => {
    const result = await dispatch(loginByUserName({ username, password }));

    if (result.meta.requestStatus === 'fulfilled') {
      onSuccess();
    }
  }, [dispatch, username, password, onSuccess]);

  return (
    <div className={getClassNames(style.loginForm, {}, [className])}>
      <Text title={t('Форма авторизации')} />
      {error && <Text text={t('Неверный логин или пароль')} theme={TextTheme.ERROR} />}
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

export default LoginForm;
