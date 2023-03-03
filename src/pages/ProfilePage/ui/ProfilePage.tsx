import { useTranslation } from 'react-i18next';

function ProfilePage() {
  const { t } = useTranslation('profile');

  return (
    <div>
      {t('Страница профиля')}
    </div>
  );
}

export default ProfilePage;
