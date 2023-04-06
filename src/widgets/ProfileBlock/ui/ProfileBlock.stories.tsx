import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ValidateProfileError } from 'features/EditProfile';
import { mockProfile } from 'entities/Profile';
import { StoreDecorator } from 'shared/config/storybook/StoreDecorator';
import { ProfileBlock } from './ProfileBlock';

export default {
  title: 'widgets/ProfileBlock',
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
})];

export const EmptyProfile = Template.bind({});
EmptyProfile.args = {};
EmptyProfile.decorators = [StoreDecorator({
  profile: {
    profile: null,
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
})];
