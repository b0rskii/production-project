import { PropsWithChildren, useCallback, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import {
  editProfileActions,
  EditProfileButton,
  editProfileSelectors,
} from 'features/EditProfile';
import {
  ProfileCard,
  PROFILE_SLICE,
  profileReducer,
  fetchProfileData,
  profileSelectors,
  ProfileHandlers,
} from 'entities/Profile';
import { Country } from 'entities/Country';
import { Currency } from 'entities/Currency';
import { Text } from 'shared/ui/Text';
import { getClassNames } from 'shared/utils/classNames';
import { useAppDispatch, useAsyncReducer } from 'shared/utils/redux';
import style from './ProfileBlock.module.scss';

type ProfileBlockProps = PropsWithChildren<{
  className?: string;
}>;

export const ProfileBlock = (props: ProfileBlockProps) => {
  const { className } = props;
  const { t } = useTranslation('profile');
  const dispatch = useAppDispatch();

  const profile = useSelector(profileSelectors.getProfile);
  const isLoading = useSelector(profileSelectors.getIsLoading);
  const error = useSelector(profileSelectors.getError);

  const profileForm = useSelector(editProfileSelectors.getProfileForm);
  const isReadonly = useSelector(editProfileSelectors.getIsReadonly);
  const isUpdating = useSelector(editProfileSelectors.getIsLoading);

  useAsyncReducer(PROFILE_SLICE, profileReducer);

  useEffect(() => {
    dispatch(fetchProfileData());
  }, [dispatch]);

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
    <div className={getClassNames('', {}, [className])}>
      <div className={style.header}>
        <Text title={t('??????????????')} />
        {profile && (
          <EditProfileButton
            className={style.editButton}
          />
        )}
      </div>
      <ProfileCard
        profile={profile}
        profileForm={profileForm}
        isLoading={isLoading || isUpdating}
        error={error}
        isReadonly={isReadonly}
        handlers={profileHandlers}
      />
    </div>
  );
};
