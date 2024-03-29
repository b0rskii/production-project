import { PropsWithChildren, useCallback, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  editProfileActions,
  EditProfileButton,
  EditProfileForm,
  editProfileSelectors,
  ProfileHandlers,
} from '@/4_features/EditProfile';
import {
  ProfileCard,
  PROFILE_SLICE,
  profileReducer,
  fetchProfileData,
  profileSelectors,
} from '@/5_entities/Profile';
import { Country } from '@/5_entities/Country';
import { Currency } from '@/5_entities/Currency';
import { userSelectors } from '@/5_entities/User';
import { Text } from '@/6_shared/ui/Text';
import { getClassNames } from '@/6_shared/utils/classNames';
import { useAppDispatch, useAsyncReducer } from '@/6_shared/utils/redux';
import { I18nNameSpace } from '@/6_shared/utils/i18n/nameSpace';
import style from './ProfileBlock.module.scss';

type ProfileBlockProps = PropsWithChildren<{
  className?: string;
}>;

export const ProfileBlock = (props: ProfileBlockProps) => {
  const { className } = props;
  const { t } = useTranslation(I18nNameSpace.Profile);
  const { id } = useParams();
  const dispatch = useAppDispatch();

  useAsyncReducer(PROFILE_SLICE, profileReducer, false);

  const profile = useSelector(profileSelectors.getProfile);
  const isLoading = useSelector(profileSelectors.getIsLoading);
  const error = useSelector(profileSelectors.getError);

  const isCurrentProfile = id === profile?.id;

  const isReadonly = useSelector(editProfileSelectors.getIsReadonly);
  const isUpdating = useSelector(editProfileSelectors.getIsLoading);
  const validateErrors = useSelector(editProfileSelectors.getValidateErrors);

  const userData = useSelector(userSelectors.getUserAuthData);

  const fetchProfile = useCallback(() => {
    if (!id) return;
    dispatch(fetchProfileData(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (!isCurrentProfile) {
      fetchProfile();
    }
  }, [isCurrentProfile, fetchProfile]);

  const onInputChange = useCallback((value: string, name?: string) => {
    if (!name) {
      return;
    }
    dispatch(editProfileActions.updateProfileForm({ [name]: value }));
  }, [dispatch]);

  const onAgeChange = useCallback((value: string) => {
    dispatch(editProfileActions.updateProfileForm({ age: Number(value) }));
  }, [dispatch]);

  const onCountryChange = useCallback((value: Country) => {
    dispatch(editProfileActions.updateProfileForm({ country: value }));
  }, [dispatch]);

  const onCurrencyChange = useCallback((value: Currency) => {
    dispatch(editProfileActions.updateProfileForm({ currency: value }));
  }, [dispatch]);

  const profileHandlers: ProfileHandlers = useMemo(
    () => ({
      onInputChange,
      onAgeChange,
      onCountryChange,
      onCurrencyChange,
    }),
    [
      onInputChange,
      onAgeChange,
      onCountryChange,
      onCurrencyChange,
    ],
  );

  return (
    <section className={getClassNames('', {}, [className])}>
      <div className={style.header}>
        <Text title={t('Профиль')} />
        {profile && userData && profile.id === userData.id && (
          <EditProfileButton
            className={style.editButton}
          />
        )}
      </div>

      {isReadonly && (
        <ProfileCard
          profile={profile}
          isLoading={isLoading}
          error={error}
          onRepeatFetch={fetchProfile}
        />
      )}
      {!isReadonly && (
        <EditProfileForm
          profile={profile}
          isUpdating={isUpdating}
          validateErrors={validateErrors}
          handlers={profileHandlers}
        />
      )}
    </section>
  );
};
