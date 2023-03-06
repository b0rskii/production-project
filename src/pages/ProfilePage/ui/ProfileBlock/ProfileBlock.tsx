import { PropsWithChildren, useCallback, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { EditProfileButton } from 'features/EditProfile';
import {
  ProfileCard,
  PROFILE_SLICE,
  profileReducer,
  fetchProfileData,
  profileSelectors,
  ProfileHandlers,
  profileActions,
} from 'entities/Profile';
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
  const profileForm = useSelector(profileSelectors.getProfileForm);
  const isLoading = useSelector(profileSelectors.getIsLoading);
  const error = useSelector(profileSelectors.getError);
  const isReadonly = useSelector(profileSelectors.getIsReadonly);

  useAsyncReducer(PROFILE_SLICE, profileReducer);

  useEffect(() => {
    dispatch(fetchProfileData());
  }, [dispatch]);

  const onFirstNameChange = useCallback((value: string) => {
    dispatch(profileActions.updateProfileForm({ firstname: value }));
  }, [dispatch]);

  const onLastNameChange = useCallback((value: string) => {
    dispatch(profileActions.updateProfileForm({ lastname: value }));
  }, [dispatch]);

  const onAgeChange = useCallback((value: string) => {
    dispatch(profileActions.updateProfileForm({ age: Number(value) }));
  }, [dispatch]);

  const profileHandlers: ProfileHandlers = useMemo(() => ({
    onFirstNameChange,
    onLastNameChange,
    onAgeChange,
  }), [onFirstNameChange, onLastNameChange, onAgeChange]);

  return (
    <div className={getClassNames('', {}, [className])}>
      <div className={style.header}>
        <Text title={t('Профиль')} />
        {profile && (
          <EditProfileButton
            className={style.editButton}
            disabled={isLoading}
          />
        )}
      </div>
      <ProfileCard
        profile={profile}
        profileForm={profileForm}
        isLoading={isLoading}
        error={error}
        isReadonly={isReadonly}
        handlers={profileHandlers}
      />
    </div>
  );
};
