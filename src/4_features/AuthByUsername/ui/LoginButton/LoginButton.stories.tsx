import { ComponentStory, ComponentMeta } from '@storybook/react';
import { mockUser } from '5_entities/User';
import { StoreDecorator } from '6_shared/config/storybook/StoreDecorator';
import { ThemeDecorator } from '6_shared/config/storybook/ThemeDecorator';
import { ButtonTheme } from '6_shared/ui/Button';
import { Theme } from '6_shared/utils/theme';
import { LoginButton } from './LoginButton';

const USER = mockUser();

export default {
  title: '4_features/AuthByUsername/LoginButton',
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
