/* eslint-disable no-unused-vars */
import { memo, PropsWithChildren, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { ProfileRow, Profile } from '5_entities/Profile';
import { Country, CountrySelect } from '5_entities/Country';
import { Currency, CurrencySelect } from '5_entities/Currency';
import { Avatar } from '6_shared/ui/Avatar';
import { Input } from '6_shared/ui/Input';
import { getClassNames } from '6_shared/utils/classNames';
import { getKeysMap } from '6_shared/utils/getKeysMap';
import { I18nNameSpace } from '6_shared/utils/i18n/nameSpace';
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
  profileForm: Profile | null;
  isUpdating: boolean;
  handlers: ProfileHandlers;
}>;

export const EditProfileForm = memo((props: ProfileProps) => {
  const {
    className,
    profile,
    profileForm,
    isUpdating,
    handlers,
  } = props;

  const {
    onInputChange,
    onAgeChange,
    onCountryChange,
    onCurrencyChange,
  } = handlers;

  const { t } = useTranslation([I18nNameSpace.Translation, I18nNameSpace.Profile]);

  const profileMap = useMemo(() => {
    if (!profile) {
      return null;
    }

    return getKeysMap<Profile>(profile);
  }, [profile]);

  return (
    <form
      className={getClassNames(
        style.editProfileForm,
        { [style.updating]: isUpdating },
        [className],
      )}
    >
      <div className={style.data}>
        {profile?.avatar && (
          <Avatar
            src={profile.avatar}
            alt={`${profile.username} avatar`}
          />
        )}

        <ProfileRow name={t('Имя', { ns: I18nNameSpace.Profile })}>
          <Input
            className={style.input}
            value={profileForm?.firstname}
            onChange={onInputChange}
            size={profileForm?.firstname?.length}
            name={profileMap?.firstname}
            disabled={isUpdating}
          />
        </ProfileRow>

        <ProfileRow name={t('Фамилия', { ns: I18nNameSpace.Profile })}>
          <Input
            className={style.input}
            value={profileForm?.lastname}
            onChange={onInputChange}
            size={profileForm?.lastname?.length}
            name={profileMap?.lastname}
            disabled={isUpdating}
          />
        </ProfileRow>

        <ProfileRow name={t('Имя пользователя')}>
          <Input
            className={style.input}
            value={profileForm?.username}
            onChange={onInputChange}
            size={profileForm?.username?.length}
            name={profileMap?.username}
            disabled={isUpdating}
          />
        </ProfileRow>

        <ProfileRow name={t('Возраст', { ns: I18nNameSpace.Profile })}>
          <Input
            className={style.input}
            value={profileForm?.age}
            onChange={onAgeChange}
            size={String(profileForm?.age).length}
            type="number"
            disabled={isUpdating}
          />
        </ProfileRow>

        <ProfileRow name={t('Город', { ns: I18nNameSpace.Profile })}>
          <Input
            className={style.input}
            value={profileForm?.city}
            onChange={onInputChange}
            size={profileForm?.city?.length}
            name={profileMap?.city}
            disabled={isUpdating}
          />
        </ProfileRow>

        <ProfileRow name={t('Страна', { ns: I18nNameSpace.Profile })}>
          <CountrySelect
            value={profileForm?.country}
            onChange={onCountryChange}
            disabled={isUpdating}
          />
        </ProfileRow>

        <ProfileRow name={t('Валюта', { ns: I18nNameSpace.Profile })}>
          <CurrencySelect
            value={profileForm?.currency}
            onChange={onCurrencyChange}
            disabled={isUpdating}
          />
        </ProfileRow>

        <ProfileRow name={t('Аватар', { ns: I18nNameSpace.Profile })}>
          <Input
            className={style.input}
            value={profileForm?.avatar}
            onChange={onInputChange}
            size={profileForm?.avatar?.length}
            name={profileMap?.avatar}
            disabled={isUpdating}
          />
        </ProfileRow>
      </div>
    </form>
  );
});
