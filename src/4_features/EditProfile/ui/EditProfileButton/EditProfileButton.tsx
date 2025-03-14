import { PropsWithChildren, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { observer } from 'mobx-react-lite';
import { profileQuery } from '@/5_entities/Profile';
import { Button, ButtonTheme } from '@/6_shared/ui/Button';
import { getClassNames } from '@/6_shared/utils/classNames';
import { I18nNameSpace } from '@/6_shared/utils/i18n/nameSpace';
import style from './EditProfileButton.module.scss';
import { editProfileStore } from '../../model/store/editProfileStore';

type EditProfileProps = PropsWithChildren<{
  className?: string;
}>;

export const EditProfileButton = observer((props: EditProfileProps) => {
  const { className } = props;
  const { t } = useTranslation(I18nNameSpace.Profile);

  const { data: profile } = profileQuery;
  const { isReadonly, profileMutation } = editProfileStore;

  const editButtonClickHandler = useCallback(() => {
    editProfileStore.startEdit(profile);
  }, [profile]);

  const cancelButtonClickHandler = useCallback(() => {
    editProfileStore.cancelEdit();
  }, []);

  const saveButtonClickHandler = useCallback(() => {
    editProfileStore.mutateProfileData();
  }, []);

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
        disabled={profileMutation.isPending}
        data-testid="EditProfileButton.CancelEdit"
      >
        {t('Отменить редактирование')}
      </Button>
      <Button
        className={getClassNames('', {}, [className])}
        theme={ButtonTheme.OUTLINE}
        onClick={saveButtonClickHandler}
        disabled={profileMutation.isPending}
        data-testid="EditProfileButton.Save"
      >
        {t('Сохранить')}
      </Button>
    </div>
  );
});
