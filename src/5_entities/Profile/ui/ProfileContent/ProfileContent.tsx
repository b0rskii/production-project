import { PropsWithChildren, ReactNode, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { getClassNames } from '@/6_shared/utils/classNames';
import { I18nNameSpace } from '@/6_shared/utils/i18n/nameSpace';
import { Stack } from '@/6_shared/ui/Stack';
import { Avatar } from '@/6_shared/ui/Avatar';
import { ProfileRow } from '../ProfileRow';

type Props = PropsWithChildren<{
  className?: string;
  avatar?: string;
  Firstname: ReactNode;
  Lastname: ReactNode;
  Username: ReactNode;
  Age: ReactNode;
  City: ReactNode;
  Country: ReactNode;
  Currency: ReactNode;
  AvatarNode?: ReactNode;
}>;

export const ProfileContent = memo((props: Props) => {
  const {
    className, avatar, Firstname, Lastname, Username, Age, City, Country, Currency, AvatarNode,
  } = props;

  const { t } = useTranslation([I18nNameSpace.Translation, I18nNameSpace.Profile]);

  return (
    <Stack className={getClassNames('', {}, [className])} mode="v" align="start" gap="l">
      {avatar && (
        <Avatar
          src={avatar}
          alt="avatar"
        />
      )}

      <ProfileRow name={t('Имя', { ns: I18nNameSpace.Profile })}>
        {Firstname}
      </ProfileRow>

      <ProfileRow name={t('Фамилия', { ns: I18nNameSpace.Profile })}>
        {Lastname}
      </ProfileRow>

      <ProfileRow name={t('Имя пользователя')}>
        {Username}
      </ProfileRow>

      <ProfileRow name={t('Возраст', { ns: I18nNameSpace.Profile })}>
        {Age}
      </ProfileRow>

      <ProfileRow name={t('Город', { ns: I18nNameSpace.Profile })}>
        {City}
      </ProfileRow>

      <ProfileRow name={t('Страна', { ns: I18nNameSpace.Profile })}>
        {Country}
      </ProfileRow>

      <ProfileRow name={t('Валюта', { ns: I18nNameSpace.Profile })}>
        {Currency}
      </ProfileRow>

      {AvatarNode && (
        <ProfileRow name={t('Аватар', { ns: I18nNameSpace.Profile })}>
          {AvatarNode}
        </ProfileRow>
      )}
    </Stack>
  );
});
