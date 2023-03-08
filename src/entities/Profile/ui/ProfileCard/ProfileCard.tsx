import { memo, PropsWithChildren } from 'react';
import { useTranslation } from 'react-i18next';
import { Country, CountrySelect } from 'entities/Country';
import { Currency, CurrencySelect } from 'entities/Currency';
import { Avatar } from 'shared/ui/Avatar/Avatar';
import { Input } from 'shared/ui/Input';
import { Loader } from 'shared/ui/Loader';
import { Text, TextTheme } from 'shared/ui/Text';
import { getClassNames } from 'shared/utils/classNames';
import { Profile } from '../../model/types/profileSchema';
import { ProfileRow } from '../ProfileRow/ProfileRow';
import style from './ProfileCard.module.scss';

export type ProfileHandlers = {
  onFirstNameChange?: (value: string) => void,
  onLastNameChange?: (value: string) => void,
  onAgeChange?: (value: string) => void;
  onCityChange?: (value: string) => void;
  onCountryChange?: (value: Country) => void;
  onCurrencyChange?: (value: Currency) => void;
  onUsernameChange?: (value: string) => void;
  onAvatarChange?: (value: string) => void;
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

  const { t } = useTranslation('profile');

  const {
    onFirstNameChange,
    onLastNameChange,
    onAgeChange,
    onCityChange,
    onCountryChange,
    onCurrencyChange,
    onUsernameChange,
    onAvatarChange,
  } = handlers;

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
            onChange={onFirstNameChange}
            size={profileForm?.firstname?.length}
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
            onChange={onLastNameChange}
            size={profileForm?.lastname?.length}
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
            onChange={onUsernameChange}
            size={profileForm?.username?.length}
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
            onChange={onCityChange}
            size={profileForm?.city?.length}
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
              onChange={onAvatarChange}
              size={profileForm?.avatar?.length}
            />
          </ProfileRow>
        )}

      </div>
    </div>
  );
});
