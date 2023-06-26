import { useEffect } from 'react';
import { LocalStorageKey } from '6_shared/const/localStorage';
import { useAppDispatch } from '6_shared/utils/redux';
import { userActions } from '../slice/userSlice';

export const useInitUserData = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const userLocalData = localStorage.getItem(LocalStorageKey.USER);

    if (userLocalData) {
      dispatch(userActions.setAuthData(
        JSON.parse(userLocalData),
      ));
    }

    dispatch(userActions.initAuthData());
  }, [dispatch]);
};
