import { getProfileForm } from './getProfileForm/getProfileForm';
import { getIsReadonly } from './getIsReadonly/getIsReadonly';
import { getIsLoading } from './getIsLoading/getIsLoading';
import { getError } from './getError/getError';
import { getValidateErrors } from './getValidateErrors/getValidateErrors';

export const editProfileSelectors = {
  getProfileForm,
  getIsReadonly,
  getIsLoading,
  getError,
  getValidateErrors,
};
