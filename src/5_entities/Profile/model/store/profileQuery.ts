import { Query } from '@/6_shared/utils/mobx/query';
import { api, ApiRoutes } from '@/6_shared/api';
import { Profile } from '../types/profileSchema';

const fetchProfile = (profileId: string) =>
  api
    .get<Profile>(`${ApiRoutes.PROFILES}/${profileId}`)
    .then(({ data }) => data);

export const profileQuery = new Query({
  queryFn: fetchProfile,
  errorMessage: 'error',
});
