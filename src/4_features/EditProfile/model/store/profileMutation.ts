import { Profile, profileQuery } from '@/5_entities/Profile';
import { Mutation } from '@/6_shared/utils/mobx/query';
import { api, ApiRoutes } from '@/6_shared/api';
import { toastifyStore } from '@/6_shared/ui/Toastify';

const updateProfile = (userId: string, profileForm: Profile | null) =>
  api
    .put<Profile | undefined>(`${ApiRoutes.PROFILES}/${userId}`, profileForm)
    .then(({ data }) => data);

export const profileMutation = new Mutation({
  mutationFn: updateProfile,
  onSuccess(data) {
    if (!data) throw new Error();
    profileQuery.setData(data);
    toastifyStore.notify('Профиль изменен');
  },
  onError() {
    toastifyStore.notifyError('Не удалось изменить профиль');
  },
  errorMessage: 'error',
});
