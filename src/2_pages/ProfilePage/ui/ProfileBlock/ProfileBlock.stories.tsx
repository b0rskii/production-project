import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ValidateProfileError } from '4_features/EditProfile';
import { mockProfile } from '5_entities/Profile';
import { mockUser } from '5_entities/User';
import { StoreDecorator } from '6_shared/config/storybook/StoreDecorator';
import { ProfileBlock } from './ProfileBlock';

const USER_DATA = mockUser();

export default {
  title: '2_pages/ProfilePage/ProfileBlock',
  component: ProfileBlock,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof ProfileBlock>;

const Template: ComponentStory<typeof ProfileBlock> = (args) => <ProfileBlock {...args} />;

export const Readonly = Template.bind({});
Readonly.args = {};
Readonly.decorators = [StoreDecorator({
  profile: {
    profile: mockProfile,
  },
  editProfile: {
    isReadonly: true,
  },
  user: {
    authData: USER_DATA,
  },
})];

export const Editing = Template.bind({});
Editing.args = {};
Editing.decorators = [StoreDecorator({
  profile: {
    profile: mockProfile,
  },
  editProfile: {
    profileForm: mockProfile,
    isReadonly: false,
  },
  user: {
    authData: USER_DATA,
  },
})];

export const EmptyProfile = Template.bind({});
EmptyProfile.args = {};
EmptyProfile.decorators = [StoreDecorator({
  profile: {
    profile: null,
  },
  user: {
    authData: USER_DATA,
  },
})];

export const ValidationErrors = Template.bind({});
ValidationErrors.args = {};
ValidationErrors.decorators = [StoreDecorator({
  profile: {
    profile: mockProfile,
  },
  editProfile: {
    profileForm: mockProfile,
    isReadonly: false,
    validateErrors: [
      ValidateProfileError.INCORRECT_FIRST_NAME,
      ValidateProfileError.INCORRECT_AGE,
    ],
  },
  user: {
    authData: USER_DATA,
  },
})];

const ANOTHER_USER_DATA = mockUser();
ANOTHER_USER_DATA.id = '55';

export const AnotherUserProfile = Template.bind({});
AnotherUserProfile.args = {};
AnotherUserProfile.decorators = [StoreDecorator({
  profile: {
    profile: mockProfile,
  },
  editProfile: {
    isReadonly: true,
  },
  user: {
    authData: ANOTHER_USER_DATA,
  },
})];
