import { ComponentStory, ComponentMeta } from '@storybook/react';
import { mockUser } from 'entities/User';
import { StoreDecorator } from 'shared/config/storybook/StoreDecorator';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator';
import { ButtonTheme } from 'shared/ui/Button';
import { Theme } from 'shared/utils/theme';
import { LoginButton } from './LoginButton';

const USER = mockUser();

export default {
  title: 'features/LoginButton',
  component: LoginButton,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: {
    theme: ButtonTheme.OUTLINE,
  },
} as ComponentMeta<typeof LoginButton>;

const Template: ComponentStory<typeof LoginButton> = (args) => <LoginButton {...args} />;

export const Default = Template.bind({});
Default.args = {};
Default.decorators = [StoreDecorator({
  user: { authData: undefined },
})];

export const Logged = Template.bind({});
Logged.args = {};
Logged.decorators = [StoreDecorator({
  user: { authData: USER },
})];

export const DefaultDark = Template.bind({});
DefaultDark.args = {};
DefaultDark.decorators = [
  ThemeDecorator(Theme.DARK),
  StoreDecorator({
    user: { authData: undefined },
  }),
];

export const LoggedDark = Template.bind({});
LoggedDark.args = {};
LoggedDark.decorators = [
  ThemeDecorator(Theme.DARK),
  StoreDecorator({
    user: { authData: USER },
  }),
];
