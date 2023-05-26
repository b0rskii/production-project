import { memo, PropsWithChildren, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { profileSelectors } from 'entities/Profile';
import { Button, ButtonTheme } from 'shared/ui/Button';
import { getClassNames } from 'shared/utils/classNames';
import { useAppDispatch, useAsyncReducer } from 'shared/utils/redux';
import { I18nNameSpace } from 'shared/utils/i18n/nameSpace';
import { editProfileActions, NAME, editProfileReducer } from '../model/slice/editProfileSlice';
import { editProfileSelectors } from '../model/selectors';
import { updateProfileData } from '../model/services/updateProfileData/updateProfileData';
import style from './EditProfileButton.module.scss';

type EditProfileProps = PropsWithChildren<{
  className?: string;
}>;

export const EditProfileButton = memo((props: EditProfileProps) => {
  const { className } = props;
  const { t } = useTranslation(I18nNameSpace.Profile);
  const dispatch = useAppDispatch();

  const profile = useSelector(profileSelectors.getProfile);

  useAsyncReducer(NAME, editProfileReducer);

  const isReadonly = useSelector(editProfileSelectors.getIsReadonly);
  const isLoading = useSelector(editProfileSelectors.getIsLoading);

  const editButtonClickHandler = useCallback(() => {
    dispatch(editProfileActions.startEdit(profile));
  }, [dispatch, profile]);

  const cancelButtonClickHandler = useCallback(() => {
    dispatch(editProfileActions.cancelEdit());
  }, [dispatch]);

  const saveButtonClickHandler = useCallback(() => {
    if (__PROJECT__ === 'storybook') {
      return;
    }

    dispatch(updateProfileData({
      success: t('Профиль изменен'),
      error: t('Не удалось изменить профиль'),
    }));
  }, [dispatch, t]);

  if (isReadonly) {
    return (
      <Button
        className={getClassNames('', {}, [className])}
        theme={ButtonTheme.OUTLINE}
        onClick={editButtonClickHandler}
      >
        {t('Редактировать')}
      </Button>
    );
  }

  return (
    <div className={getClassNames('', {}, [className, style.editing])}>
      <Button
        className={getClassNames('', {}, [className])}
        theme={ButtonTheme.OUTLINE_RED}
        onClick={cancelButtonClickHandler}
        disabled={isLoading}
      >
        {t('Отменить редактирование')}
      </Button>
      <Button
        className={getClassNames('', {}, [className])}
        theme={ButtonTheme.OUTLINE}
        onClick={saveButtonClickHandler}
        disabled={isLoading}
      >
        {t('Сохранить')}
      </Button>
    </div>
  );
});
