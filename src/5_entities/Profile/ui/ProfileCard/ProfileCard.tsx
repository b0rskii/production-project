import { memo, PropsWithChildren } from 'react';
import { useTranslation } from 'react-i18next';
import { Avatar } from '6_shared/ui/Avatar';
import { Loader } from '6_shared/ui/Loader';
import { Text, TextTheme } from '6_shared/ui/Text';
import { getClassNames } from '6_shared/utils/classNames';
import { I18nNameSpace } from '6_shared/utils/i18n/nameSpace';
import { Profile } from '../../model/types/profileSchema';
import { ProfileRow } from '../ProfileRow';
import style from './ProfileCard.module.scss';

type ProfileProps = PropsWithChildren<{
  className?: string;
  profile: Profile | null;
  isLoading: boolean;
  error: string | null;
}>;

export const ProfileCard = memo((props: ProfileProps) => {
  const {
    className,
    profile,
    isLoading,
    error,
  } = props;

  const { t } = useTranslation([I18nNameSpace.Translation, I18nNameSpace.Profile]);

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
          title={t('При загрузке профиля произошла ошибка', { ns: I18nNameSpace.Profile })}
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

        <ProfileRow name={t('Имя', { ns: I18nNameSpace.Profile })}>
          {profile.firstname}
        </ProfileRow>

        <ProfileRow name={t('Фамилия', { ns: I18nNameSpace.Profile })}>
          {profile.lastname}
        </ProfileRow>

        <ProfileRow name={t('Имя пользователя')}>
          {profile.username}
        </ProfileRow>

        <ProfileRow name={t('Возраст', { ns: I18nNameSpace.Profile })}>
          {String(profile.age)}
        </ProfileRow>

        <ProfileRow name={t('Город', { ns: I18nNameSpace.Profile })}>
          {profile.city}
        </ProfileRow>

        <ProfileRow name={t('Страна', { ns: I18nNameSpace.Profile })}>
          {profile.country}
        </ProfileRow>

        <ProfileRow name={t('Валюта', { ns: I18nNameSpace.Profile })}>
          {profile.currency}
        </ProfileRow>
      </div>
    </div>
  );
});
