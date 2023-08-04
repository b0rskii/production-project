export { SLICE_NAME as PROFILE_SLICE } from './model/const';
export { profileActions, profileReducer } from './model/slice/profileSlice';
export { Profile, ProfileSchema } from './model/types/profileSchema';
export { fetchProfileData } from './model/services/fetchProfileData/fetchProfileData';
export { profileSelectors } from './model/selectors';
export { ProfileCard } from './ui/ProfileCard';
export { ProfileContent } from './ui/ProfileContent';
export { mockProfile } from './model/mocks';
