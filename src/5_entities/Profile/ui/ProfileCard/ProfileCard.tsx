import { memo, PropsWithChildren } from 'react';
import { useTranslation } from 'react-i18next';
import { Loader } from '6_shared/ui/Loader';
import { FetchError } from '6_shared/ui/FetchError';
import { getClassNames } from '6_shared/utils/classNames';
import { I18nNameSpace } from '6_shared/utils/i18n/nameSpace';
import { Profile } from '../../model/types/profileSchema';
import { ProfileContent } from '../ProfileContent';
import style from './ProfileCard.module.scss';

type ProfileProps = PropsWithChildren<{
  className?: string;
  profile: Profile | null;
  isLoading: boolean;
  error: string | null;
  onRepeatFetch?: () => void;
}>;

export const ProfileCard = memo((props: ProfileProps) => {
  const {
    className,
    profile,
    isLoading,
    error,
    onRepeatFetch,
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
        <FetchError
          message={t('При загрузке профиля произошла ошибка', { ns: I18nNameSpace.Profile })}
          onRepeat={onRepeatFetch}
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
      <ProfileContent
        avatar={profile.avatar}
        Firstname={profile.firstname}
        Lastname={profile.lastname}
        Username={profile.username}
        Age={String(profile.age)}
        City={profile.city}
        Country={profile.country}
        Currency={profile.currency}
      />
    </div>
  );
});
