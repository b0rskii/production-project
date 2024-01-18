import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ThemeDecorator } from '6_shared/config/storybook/ThemeDecorator';
import { Theme } from '6_shared/utils/theme';
import { EditProfileForm } from './EditProfileForm';

export default {
  title: '4_features/EditProfile/EditProfileForm',
  component: EditProfileForm,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof EditProfileForm>;

const Template: ComponentStory<typeof EditProfileForm> = (args) => <EditProfileForm {...args} />;

export const Default = Template.bind({});
Default.args = {};

export const DefaultDark = Template.bind({});
DefaultDark.args = {};
DefaultDark.decorators = [ThemeDecorator(Theme.DARK)];
