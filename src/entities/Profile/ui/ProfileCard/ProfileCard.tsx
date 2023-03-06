import { memo, PropsWithChildren } from 'react';
import { useTranslation } from 'react-i18next';
import { Input } from 'shared/ui/Input';
import { Loader } from 'shared/ui/Loader';
import { Text, TextTheme } from 'shared/ui/Text';
import { getClassNames } from 'shared/utils/classNames';
import { Profile } from '../../model/types/profileSchema';
import { ProfileRow } from '../ProfileRow/ProfileRow';
import style from './ProfileCard.module.scss';

const ProfileTranslationKey: Record<keyof Profile, string> = {
  firstname: 'Имя',
  lastname: 'Фамилия',
  age: 'Возраст',
  avatar: 'Аватар',
  city: 'Город',
  country: 'Страна',
  currency: 'Валюта',
  username: 'Имя пользователя',
};

export type ProfileHandlers = {
  onFirstNameChange?: (value: string) => void,
  onLastNameChange?: (value: string) => void,
  onAgeChange?: (value: string) => void;
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

        <ProfileRow
          name={t(ProfileTranslationKey.firstname)}
          value={profile.firstname}
          isReadonly={isReadonly}
        >
          <Input
            className={style.input}
            value={profileForm?.firstname}
            onChange={onFirstNameChange}
            name={ProfileTranslationKey.firstname}
          />
        </ProfileRow>

        <ProfileRow
          name={t(ProfileTranslationKey.lastname)}
          value={profile.lastname}
          isReadonly={isReadonly}
        >
          <Input
            className={style.input}
            value={profileForm?.lastname}
            onChange={onLastNameChange}
            name={ProfileTranslationKey.lastname}
          />
        </ProfileRow>

        <ProfileRow
          name={t(ProfileTranslationKey.age)}
          value={String(profile.age)}
          isReadonly={isReadonly}
        >
          <Input
            className={style.input}
            value={profileForm?.age}
            onChange={onAgeChange}
            name={ProfileTranslationKey.age}
            type="number"
          />
        </ProfileRow>

      </div>
    </div>
  );
});
