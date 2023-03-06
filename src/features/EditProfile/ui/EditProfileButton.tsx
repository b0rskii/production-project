import { memo, PropsWithChildren, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { profileActions, profileSelectors, updateProfileData } from 'entities/Profile';
import { Button, ButtonTheme } from 'shared/ui/Button';
import { getClassNames } from 'shared/utils/classNames';
import { useAppDispatch } from 'shared/utils/redux';
import style from './EditProfileButton.module.scss';

type EditProfileProps = PropsWithChildren<{
  className?: string;
  disabled?: boolean;
}>;

export const EditProfileButton = memo((props: EditProfileProps) => {
  const {
    className,
    disabled,
  } = props;

  const dispatch = useAppDispatch();
  const { t } = useTranslation('profile');
  const isReadonly = useSelector(profileSelectors.getIsReadonly);

  const editButtonClickHandler = useCallback(() => {
    dispatch(profileActions.startEdit());
  }, [dispatch]);

  const cancelButtonClickHandler = useCallback(() => {
    dispatch(profileActions.cancelEdit());
  }, [dispatch]);

  const saveButtonClickHandler = useCallback(() => {
    dispatch(updateProfileData());
  }, [dispatch]);

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
        disabled={disabled}
      >
        {t('Отменить редактирование')}
      </Button>
      <Button
        className={getClassNames('', {}, [className])}
        theme={ButtonTheme.OUTLINE}
        onClick={saveButtonClickHandler}
        disabled={disabled}
      >
        {t('Сохранить')}
      </Button>
    </div>
  );
});
