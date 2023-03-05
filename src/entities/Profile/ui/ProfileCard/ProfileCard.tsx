import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Button, ButtonTheme } from 'shared/ui/Button';
import { Input } from 'shared/ui/Input';
import { Loader } from 'shared/ui/Loader';
import { Text } from 'shared/ui/Text';
import { getClassNames } from 'shared/utils/classNames/getClassNames';
import { profileSelectors } from '../../model/selectors';
import style from './ProfileCard.module.scss';

type ProfileProps = {
  className?: string;
};

export const ProfileCard: FC<ProfileProps> = (props) => {
  const { className } = props;
  const { t } = useTranslation('profile');
  const profile = useSelector(profileSelectors.getProfile);
  const isLoading = useSelector(profileSelectors.getIsLoading);

  if (isLoading) {
    return (
      <div className={getClassNames(style.profileCard, {}, [className])}>
        <div className={style.loaderWrapper}>
          <Loader />
        </div>
      </div>
    );
  }

  return (
    <div className={getClassNames(style.profileCard, {}, [className])}>
      <div className={style.header}>
        <Text title={t('Профиль')} />
        <Button
          className={style.editButton}
          theme={ButtonTheme.OUTLINE}
        >
          {t('Редактировать')}
        </Button>
      </div>
      <div className={style.data}>
        <Input
          className={style.input}
          value={profile?.firstname}
          placeholder={t('Ваше имя')}
        />
        <Input
          className={style.input}
          value={profile?.lastname}
          placeholder={t('Ваша фамилия')}
        />
      </div>
    </div>
  );
};
