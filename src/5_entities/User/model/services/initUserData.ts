import { LocalStorageKey } from '@/6_shared/const/localStorage';
import { useAppDispatch } from '@/6_shared/utils/redux';
import { userActions } from '../slice/userSlice';
import { useMountEffect } from '@/6_shared/utils/react/lifeCycle';

export const useInitUserData = () => {
  const dispatch = useAppDispatch();

  useMountEffect(() => {
    const userLocalData = localStorage.getItem(LocalStorageKey.USER);

    if (userLocalData) {
      dispatch(userActions.setAuthData(JSON.parse(userLocalData)));
    }

    dispatch(userActions.initAuthData());
  });
};
