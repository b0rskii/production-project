import { PropsWithChildren, useCallback, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  editProfileActions,
  EditProfileButton,
  editProfileSelectors,
  ValidateProfileError,
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
import { userSelectors } from 'entities/User';
import { Text, TextTheme } from 'shared/ui/Text';
import { getClassNames } from 'shared/utils/classNames';
import { useAppDispatch, useAsyncReducer } from 'shared/utils/redux';
import { I18nNameSpace } from 'shared/utils/i18n/nameSpace';
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

  const profileForm = useSelector(editProfileSelectors.getProfileForm);
  const isReadonly = useSelector(editProfileSelectors.getIsReadonly);
  const isUpdating = useSelector(editProfileSelectors.getIsLoading);
  const validateErrors = useSelector(editProfileSelectors.getValidateErrors);

  const userData = useSelector(userSelectors.getUserAuthData);

  const ValidateErrorTranslation = {
    [ValidateProfileError.INCORRECT_FIRST_NAME]: t('Введите ваше имя'),
    [ValidateProfileError.INCORRECT_LAST_NAME]: t('Введите вашу фамилию'),
    [ValidateProfileError.INCORRECT_AGE]: t('Неверный возраст'),
    [ValidateProfileError.NO_DATA]: t('Нет данных'),
  } as const;

  useEffect(() => {
    if (!id || __PROJECT__ === 'storybook') {
      return;
    }

    if (id !== profile?.id) {
      dispatch(fetchProfileData(id));
    }
  }, [dispatch, id, profile?.id]);

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

      {validateErrors && validateErrors.map((error) => (
        <Text text={ValidateErrorTranslation[error]} theme={TextTheme.ERROR} key={error} />
      ))}

      <ProfileCard
        profile={profile}
        profileForm={profileForm}
        isLoading={isLoading || isUpdating}
        error={error}
        isReadonly={isReadonly}
        handlers={profileHandlers}
      />
    </section>
  );
};
