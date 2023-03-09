import { ComponentStory, ComponentMeta } from '@storybook/react';
import { StoreDecorator } from 'shared/config/storybook/StoreDecorator';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator';
import { Theme } from 'shared/utils/theme';
import { EditProfileButton } from './EditProfileButton';

export default {
  title: 'features/EditProfileButton',
  component: EditProfileButton,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: {},
} as ComponentMeta<typeof EditProfileButton>;

const Template: ComponentStory<typeof EditProfileButton> = (args) => <EditProfileButton {...args} />;

export const Readonly = Template.bind({});
Readonly.args = {};
Readonly.decorators = [StoreDecorator({
  profile: { profile: {} },
  editProfile: { isLoading: false, isReadonly: true },
})];

export const Editing = Template.bind({});
Editing.args = {};
Editing.decorators = [StoreDecorator({
  profile: { profile: {} },
  editProfile: { isLoading: false, isReadonly: false },
})];

export const Loading = Template.bind({});
Loading.args = {};
Loading.decorators = [StoreDecorator({
  profile: { profile: {} },
  editProfile: { isLoading: true, isReadonly: false },
})];

export const ReadonlyDark = Template.bind({});
ReadonlyDark.args = {};
ReadonlyDark.decorators = [
  StoreDecorator({
    profile: { profile: {} },
    editProfile: { isLoading: false, isReadonly: true },
  }),
  ThemeDecorator(Theme.DARK),
];

export const EditingDark = Template.bind({});
EditingDark.args = {};
EditingDark.decorators = [
  StoreDecorator({
    profile: { profile: {} },
    editProfile: { isLoading: false, isReadonly: false },
  }),
  ThemeDecorator(Theme.DARK),
];

export const LoadingDark = Template.bind({});
LoadingDark.args = {};
LoadingDark.decorators = [
  StoreDecorator({
    profile: { profile: {} },
    editProfile: { isLoading: true, isReadonly: false },
  }),
  ThemeDecorator(Theme.DARK),
];
