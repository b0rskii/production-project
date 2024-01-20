import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ThemeDecorator } from '@/6_shared/config/storybook/ThemeDecorator';
import { Theme } from '@/6_shared/utils/theme';
import { Notification } from './Notification';

export default {
  title: '6_shared/Notification',
  component: Notification,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof Notification>;

const Template: ComponentStory<typeof Notification> = (args) => <Notification {...args} />;

export const Success = Template.bind({});
Success.args = {
  notification: {
    text: 'Операция прошла успешно',
    type: 'success',
  },
};

export const Error = Template.bind({});
Error.args = {
  notification: {
    text: 'Не удалось произвести операцию',
    type: 'error',
  },
};

export const SuccessDark = Template.bind({});
SuccessDark.args = {
  notification: {
    text: 'Операция прошла успешно',
    type: 'success',
  },
};
SuccessDark.decorators = [ThemeDecorator(Theme.DARK)];

export const ErrorDark = Template.bind({});
ErrorDark.args = {
  notification: {
    text: 'Не удалось произвести операцию',
    type: 'error',
  },
};
ErrorDark.decorators = [ThemeDecorator(Theme.DARK)];
