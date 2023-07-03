import { ComponentStory, ComponentMeta } from '@storybook/react';
import { StoreDecorator } from '6_shared/config/storybook/StoreDecorator';
import { ThemeDecorator } from '6_shared/config/storybook/ThemeDecorator';
import { Theme } from '6_shared/utils/theme';
import LoginForm from './LoginForm';

export default {
  title: '4_features/AuthByUsername/LoginForm',
  component: LoginForm,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  decorators: [StoreDecorator({
    login: { username: 'User', password: 'pass' },
  })],
} as ComponentMeta<typeof LoginForm>;

// eslint-disable-next-line react/jsx-props-no-spreading
const Template: ComponentStory<typeof LoginForm> = (args) => <LoginForm {...args} />;

export const Default = Template.bind({});
Default.args = {};
Default.decorators = [StoreDecorator({
  login: { username: 'User', password: 'pass' },
})];

export const Loading = Template.bind({});
Loading.args = {};
Loading.decorators = [StoreDecorator({
  login: { username: 'User', password: 'pass', isLoading: true },
})];

export const Error = Template.bind({});
Error.args = {};
Error.decorators = [StoreDecorator({
  login: { username: 'User', password: 'pass', error: 'error' },
})];

export const DefaultDark = Template.bind({});
DefaultDark.args = {};
DefaultDark.decorators = [
  ThemeDecorator(Theme.DARK),
  StoreDecorator({
    login: { username: 'User', password: 'pass' },
  }),
];

export const LoadingDark = Template.bind({});
LoadingDark.args = {};
LoadingDark.decorators = [
  ThemeDecorator(Theme.DARK),
  StoreDecorator({
    login: { username: 'User', password: 'pass', isLoading: true },
  }),
];

export const ErrorDark = Template.bind({});
ErrorDark.args = {};
ErrorDark.decorators = [
  ThemeDecorator(Theme.DARK),
  StoreDecorator({
    login: { username: 'User', password: 'pass', error: 'error' },
  }),
];
