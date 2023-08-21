import { memo, PropsWithChildren, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { profileSelectors } from '5_entities/Profile';
import { Button, ButtonTheme } from '6_shared/ui/Button';
import { getClassNames } from '6_shared/utils/classNames';
import { useAppDispatch, useAsyncReducer } from '6_shared/utils/redux';
import { I18nNameSpace } from '6_shared/utils/i18n/nameSpace';
import { editProfileActions, editProfileReducer } from '../../model/slice/editProfileSlice';
import { SLICE_NAME } from '../../model/const';
import { editProfileSelectors } from '../../model/selectors';
import { updateProfileData } from '../../model/services/updateProfileData/updateProfileData';
import style from './EditProfileButton.module.scss';

type EditProfileProps = PropsWithChildren<{
  className?: string;
}>;

export const EditProfileButton = memo((props: EditProfileProps) => {
  const { className } = props;
  const { t } = useTranslation(I18nNameSpace.Profile);
  const dispatch = useAppDispatch();

  const profile = useSelector(profileSelectors.getProfile);

  useAsyncReducer(SLICE_NAME, editProfileReducer);

  const isReadonly = useSelector(editProfileSelectors.getIsReadonly);
  const isLoading = useSelector(editProfileSelectors.getIsLoading);

  const editButtonClickHandler = useCallback(() => {
    dispatch(editProfileActions.startEdit(profile));
  }, [dispatch, profile]);

  const cancelButtonClickHandler = useCallback(() => {
    dispatch(editProfileActions.cancelEdit());
  }, [dispatch]);

  const saveButtonClickHandler = useCallback(() => {
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
        data-testid="EditProfileButton.Edit"
      >
        {t('Редактировать', { ns: I18nNameSpace.Translation })}
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
        data-testid="EditProfileButton.CancelEdit"
      >
        {t('Отменить редактирование')}
      </Button>
      <Button
        className={getClassNames('', {}, [className])}
        theme={ButtonTheme.OUTLINE}
        onClick={saveButtonClickHandler}
        disabled={isLoading}
        data-testid="EditProfileButton.Save"
      >
        {t('Сохранить')}
      </Button>
    </div>
  );
});
