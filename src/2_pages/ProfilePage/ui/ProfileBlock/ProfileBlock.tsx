import { PropsWithChildren, useCallback, useEffect, useMemo } from 'react';
import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import {
  EditProfileButton,
  EditProfileForm,
  editProfileStore,
  ProfileHandlers,
} from '@/4_features/EditProfile';
import { ProfileCard, profileQuery } from '@/5_entities/Profile';
import { Country } from '@/5_entities/Country';
import { Currency } from '@/5_entities/Currency';
import { userStore } from '@/5_entities/User';
import { Text } from '@/6_shared/ui/Text';
import { getClassNames } from '@/6_shared/utils/classNames';
import { I18nNameSpace } from '@/6_shared/utils/i18n/nameSpace';
import style from './ProfileBlock.module.scss';

type ProfileBlockProps = PropsWithChildren<{
  className?: string;
}>;

export const ProfileBlock = observer((props: ProfileBlockProps) => {
  const { className } = props;
  const { t } = useTranslation(I18nNameSpace.Profile);
  const { id } = useParams();

  const { authData, userId } = userStore;
  const { data: profile } = profileQuery;
  const { isReadonly, validateErrors, profileMutation } = editProfileStore;

  const isCurrentProfile = id === profile?.id;

  const fetchProfile = useCallback(() => {
    if (!id) return;
    profileQuery.fetch(id);
  }, [id]);

  useEffect(() => {
    if (!isCurrentProfile) {
      fetchProfile();
    }
  }, [isCurrentProfile, fetchProfile]);

  useEffect(() => {
    return () => {
      editProfileStore.cancelEdit();
    };
  }, []);

  const onInputChange = useCallback((value: string, name?: string) => {
    if (!name) return;
    editProfileStore.updateProfileForm({ [name]: value });
  }, []);

  const onAgeChange = useCallback((value: string) => {
    editProfileStore.updateProfileForm({ age: Number(value) });
  }, []);

  const onCountryChange = useCallback((value: Country) => {
    editProfileStore.updateProfileForm({ country: value });
  }, []);

  const onCurrencyChange = useCallback((value: Currency) => {
    editProfileStore.updateProfileForm({ currency: value });
  }, []);

  const profileHandlers: ProfileHandlers = useMemo(
    () => ({
      onInputChange,
      onAgeChange,
      onCountryChange,
      onCurrencyChange,
    }),
    [onInputChange, onAgeChange, onCountryChange, onCurrencyChange],
  );

  return (
    <section className={getClassNames('', {}, [className])}>
      <div className={style.header}>
        <Text title={t('Профиль')} />
        {profile && authData && profile.id === userId && (
          <EditProfileButton className={style.editButton} />
        )}
      </div>

      {isReadonly && (
        <ProfileCard
          profile={profile}
          isLoading={profileQuery.isLoading}
          error={profileQuery.error}
          onRepeatFetch={fetchProfile}
        />
      )}
      {!isReadonly && (
        <EditProfileForm
          profile={profile}
          isUpdating={profileMutation.isPending}
          validateErrors={validateErrors}
          handlers={profileHandlers}
        />
      )}
    </section>
  );
});
