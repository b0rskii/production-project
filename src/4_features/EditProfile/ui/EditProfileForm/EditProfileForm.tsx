/* eslint-disable no-unused-vars */
import { memo, PropsWithChildren, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Profile, ProfileContent } from '5_entities/Profile';
import { Country, CountrySelect } from '5_entities/Country';
import { Currency, CurrencySelect } from '5_entities/Currency';
import { Field } from '6_shared/ui/Field';
import { Text, TextTheme } from '6_shared/ui/Text';
import { getClassNames } from '6_shared/utils/classNames';
import { getKeysMap } from '6_shared/utils/getKeysMap';
import { I18nNameSpace } from '6_shared/utils/i18n/nameSpace';
import { ValidateProfileError } from '../../model/types/editProfileSchema';
import style from './EditProfileForm.module.scss';

export type ProfileHandlers = {
  onInputChange?: (value: string, name?: string) => void,
  onAgeChange?: (value: string) => void;
  onCountryChange: (value: Country) => void;
  onCurrencyChange: (value: Currency) => void;
};

type ProfileProps = PropsWithChildren<{
  className?: string;
  profile: Profile | null;
  isUpdating: boolean;
  validateErrors: ValidateProfileError[] | null;
  handlers: ProfileHandlers;
}>;

export const EditProfileForm = memo((props: ProfileProps) => {
  const {
    className,
    profile,
    isUpdating,
    validateErrors,
    handlers,
  } = props;

  const {
    onInputChange,
    onAgeChange,
    onCountryChange,
    onCurrencyChange,
  } = handlers;

  const { t } = useTranslation(I18nNameSpace.Profile);

  const profileMap = useMemo(() => {
    if (!profile) {
      return null;
    }

    return getKeysMap<Profile>(profile);
  }, [profile]);

  const ValidateErrorTranslation = {
    [ValidateProfileError.INCORRECT_FIRST_NAME]: t('Введите ваше имя'),
    [ValidateProfileError.INCORRECT_LAST_NAME]: t('Введите вашу фамилию'),
    [ValidateProfileError.INCORRECT_USER_NAME]: t('Введите имя пользователя'),
    [ValidateProfileError.INCORRECT_AGE]: t('Неверный возраст'),
    [ValidateProfileError.NO_DATA]: t('Нет данных'),
  } as const;

  return (
    <>
      {validateErrors && validateErrors.map((error) => (
        <Text
          text={ValidateErrorTranslation[error]}
          theme={TextTheme.ERROR}
          key={error}
          data-testid="EditProfileForm.Error"
        />
      ))}

      <form
        className={getClassNames(
          style.editProfileForm,
          { [style.updating]: isUpdating },
          [className],
        )}
      >
        <ProfileContent
          avatar={profile?.avatar}
          Firstname={(
            <Field
              className={style.input}
              initialValue={profile?.firstname}
              onChange={onInputChange}
              name={profileMap?.firstname}
              disabled={isUpdating}
              data-testid="EditProfileForm.Firstname"
            />
          )}
          Lastname={(
            <Field
              className={style.input}
              initialValue={profile?.lastname}
              onChange={onInputChange}
              name={profileMap?.lastname}
              disabled={isUpdating}
              data-testid="EditProfileForm.Lastname"
            />
          )}
          Username={(
            <Field
              className={style.input}
              initialValue={profile?.username}
              onChange={onInputChange}
              name={profileMap?.username}
              disabled={isUpdating}
              data-testid="EditProfileForm.Username"
            />
          )}
          Age={(
            <Field
              className={style.input}
              initialValue={profile?.age}
              onChange={onAgeChange}
              type="number"
              disabled={isUpdating}
              data-testid="EditProfileForm.Age"
            />
          )}
          City={(
            <Field
              className={style.input}
              initialValue={profile?.city}
              onChange={onInputChange}
              name={profileMap?.city}
              disabled={isUpdating}
              data-testid="EditProfileForm.City"
            />
          )}
          Country={(
            <CountrySelect
              initialValue={profile?.country}
              onChange={onCountryChange}
              disabled={isUpdating}
            />
          )}
          Currency={(
            <CurrencySelect
              initialValue={profile?.currency}
              onChange={onCurrencyChange}
              disabled={isUpdating}
            />
          )}
          AvatarNode={(
            <Field
              className={style.input}
              initialValue={profile?.avatar}
              onChange={onInputChange}
              name={profileMap?.avatar}
              disabled={isUpdating}
              data-testid="EditProfileForm.Avatar"
            />
          )}
        />
      </form>
    </>
  );
});
