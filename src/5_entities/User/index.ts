export { SLICE_NAME as USER_SLICE } from './model/const';
export { userReducer, userActions } from './model/slice/userSlice';
export { userSelectors } from './model/selectors';
export { UserSchema, User, UserRole } from './model/types/userSchema';
export { mockUser } from './model/mocks';
export { useInitUserData } from './model/services/initUserData';
