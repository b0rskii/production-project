import { useEffect } from 'react';

import { userStore } from '../store/userStore';

export const useInitUserData = () => {
  useEffect(() => {
    userStore.initUserData();
  }, []);
};
