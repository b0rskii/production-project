import { memo, PropsWithChildren, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Country, CountrySelect } from 'entities/Country';
import { Currency, CurrencySelect } from 'entities/Currency';
import { Avatar } from 'shared/ui/Avatar';
import { Input } from 'shared/ui/Input';
import { Loader } from 'shared/ui/Loader';
import { Text, TextTheme } from 'shared/ui/Text';
import { getClassNames } from 'shared/utils/classNames';
import { getKeysMap } from 'shared/utils/getKeysMap';
import { Profile } from '../../model/types/profileSchema';
import { ProfileRow } from '../ProfileRow';
import style from './ProfileCard.module.scss';

export type ProfileHandlers = {
  onInputChange?: (value: string, name?: string) => void,
  onAgeChange?: (value: string) => void;
  onCountryChange?: (value: Country) => void;
  onCurrencyChange?: (value: Currency) => void;
};

type ProfileProps = PropsWithChildren<{
  className?: string;
  profile: Profile | null;
  profileForm: Profile | null;
  isLoading: boolean;
  error: string | null;
  isReadonly: boolean;
  handlers: ProfileHandlers;
}>;

export const ProfileCard = memo((props: ProfileProps) => {
  const {
    className,
    profile,
    profileForm,
    isLoading,
    error,
    isReadonly,
    handlers,
  } = props;

  const {
    onInputChange,
    onAgeChange,
    onCountryChange,
    onCurrencyChange,
  } = handlers;

  const { t } = useTranslation('profile');

  const profileMap = useMemo(() => {
    if (!profile) {
      return null;
    }

    return getKeysMap<Profile>(profile);
  }, [profile]);

  if (isLoading) {
    return (
      <div className={getClassNames(style.profileCard, {}, [className, style.loading])}>
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className={getClassNames(style.profileCard, {}, [className, style.error])}>
        <Text
          title={t('При загрузке профиля произошла ошибка')}
          text={t('Попробуйте обновить страницу')}
          theme={TextTheme.ERROR}
          align="center"
        />
      </div>
    );
  }

  if (!profile) {
    return (
      <div className={getClassNames(style.profileCard, {}, [className, style.loading])} />
    );
  }

  return (
    <div className={getClassNames(style.profileCard, {}, [className])}>
      <div className={style.data}>
        {profile.avatar && (
          <Avatar
            src={profile.avatar}
            alt={`${profile.username} avatar`}
          />
        )}

        <ProfileRow
          name={t('Имя')}
          value={profile.firstname}
          isReadonly={isReadonly}
        >
          <Input
            className={style.input}
            value={profileForm?.firstname}
            onChange={onInputChange}
            size={profileForm?.firstname?.length}
            name={profileMap?.firstname}
          />
        </ProfileRow>

        <ProfileRow
          name={t('Фамилия')}
          value={profile.lastname}
          isReadonly={isReadonly}
        >
          <Input
            className={style.input}
            value={profileForm?.lastname}
            onChange={onInputChange}
            size={profileForm?.lastname?.length}
            name={profileMap?.lastname}
          />
        </ProfileRow>

        <ProfileRow
          name={t('Имя пользователя')}
          value={profile.username}
          isReadonly={isReadonly}
        >
          <Input
            className={style.input}
            value={profileForm?.username}
            onChange={onInputChange}
            size={profileForm?.username?.length}
            name={profileMap?.username}
          />
        </ProfileRow>

        <ProfileRow
          name={t('Возраст')}
          value={String(profile.age)}
          isReadonly={isReadonly}
        >
          <Input
            className={style.input}
            value={profileForm?.age}
            onChange={onAgeChange}
            size={String(profileForm?.age).length}
            type="number"
          />
        </ProfileRow>

        <ProfileRow
          name={t('Город')}
          value={profile.city}
          isReadonly={isReadonly}
        >
          <Input
            className={style.input}
            value={profileForm?.city}
            onChange={onInputChange}
            size={profileForm?.city?.length}
            name={profileMap?.city}
          />
        </ProfileRow>

        <ProfileRow
          name={t('Страна')}
          value={profile.country}
          isReadonly={isReadonly}
        >
          <CountrySelect
            value={profileForm?.country}
            onChange={onCountryChange}
          />
        </ProfileRow>

        <ProfileRow
          name={t('Валюта')}
          value={profile.currency}
          isReadonly={isReadonly}
        >
          <CurrencySelect
            value={profileForm?.currency}
            onChange={onCurrencyChange}
          />
        </ProfileRow>

        {!isReadonly && (
          <ProfileRow
            name={t('Аватар')}
            value={profile.avatar}
            isReadonly={isReadonly}
          >
            <Input
              className={style.input}
              value={profileForm?.avatar}
              onChange={onInputChange}
              size={profileForm?.avatar?.length}
              name={profileMap?.avatar}
            />
          </ProfileRow>
        )}

      </div>
    </div>
  );
});
