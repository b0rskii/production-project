import { useEffect } from 'react';
// import { useTranslation } from 'react-i18next';
import { PROFILE_SLICE, profileReducer, fetchProfileData, ProfileCard } from 'entities/Profile';
import { useAppDispatch, useAsyncReducer } from 'shared/utils/redux';

function ProfilePage() {
  // const { t } = useTranslation('profile');
  const dispatch = useAppDispatch();

  useAsyncReducer(PROFILE_SLICE, profileReducer);

  useEffect(() => {
    dispatch(fetchProfileData());
  }, [dispatch]);

  return (
    <div>
      <ProfileCard />
    </div>
  );
}

export default ProfilePage;
