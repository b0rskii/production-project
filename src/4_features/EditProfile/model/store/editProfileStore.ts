import { makeAutoObservable } from 'mobx';
import { Profile } from '@/5_entities/Profile';
import { UserStore, userStore } from '@/5_entities/User';
import { ValidateProfileError } from '../const';
import { profileMutation } from './profileMutation';
import { validateProfileData } from '../services/validateProfile/validateProfile';

class EditProfileStore {
  constructor(userStore: UserStore) {
    makeAutoObservable(this);
    this.userStore = userStore;
  }

  private userStore: UserStore;
  private profileForm: Profile | null = null;

  isReadonly: boolean = true;
  validateErrors: ValidateProfileError[] | null = [];
  profileMutation = profileMutation;

  startEdit(value: Profile | null) {
    this.isReadonly = false;
    this.profileForm = value;
  }

  cancelEdit() {
    this.isReadonly = true;
    this.validateErrors = null;
  }

  updateProfileForm(updated: Profile) {
    this.profileForm = {
      ...this.profileForm,
      ...updated,
    };
  }

  async mutateProfileData() {
    const profileErrors = validateProfileData(this.profileForm);

    if (profileErrors.length) {
      this.validateErrors = profileErrors;
      return;
    }

    const { userId } = this.userStore;

    if (!userId) return;

    this.profileMutation.mutate(userId, this.profileForm);
  }
}

export const editProfileStore = new EditProfileStore(userStore);
