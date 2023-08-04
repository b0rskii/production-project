import { FC, FormEvent, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Button, ButtonTheme } from '6_shared/ui/Button';
import { Text, TextTheme } from '6_shared/ui/Text';
import { Input } from '6_shared/ui/Input';
import { getClassNames } from '6_shared/utils/classNames';
import { useAppDispatch, useAsyncReducer } from '6_shared/utils/redux';
import { loginSelectors } from '../../model/selectors';
import { loginActions, loginReducer } from '../../model/slice/loginSlice';
import { SLICE_NAME } from '../../model/const';
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

  useAsyncReducer(SLICE_NAME, loginReducer);

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

  const formSubmitHandler = async (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    const result = await dispatch(loginByUserName({ username, password }));

    if (result.meta.requestStatus === 'fulfilled') {
      onSuccess();
    }
  };

  return (
    <form
      className={getClassNames(style.loginForm, {}, [className])}
      onSubmit={formSubmitHandler}
    >
      <Text title={t('Форма авторизации')} />
      {error && <Text text={t('Неверный логин или пароль')} theme={TextTheme.ERROR} />}
      <Input
        className={style.input}
        type="text"
        placeholder={t('Имя пользователя')}
        value={username}
        autoFocus
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
        disabled={isLoading}
        type="submit"
      >
        {t('Войти')}
      </Button>
    </form>
  );
};

export default LoginForm;
