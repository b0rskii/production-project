import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator';
import { Theme } from 'shared/utils/theme';
import { NotificationsList } from './NotificationsList';
import { NotificationItem } from '../Notification';

const notification: NotificationItem = { text: 'Операция прошла успешно', type: 'success' };
const notifications = [notification, notification, notification];

export default {
  title: 'shared/NotificationsList',
  component: NotificationsList,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof NotificationsList>;

const Template: ComponentStory<typeof NotificationsList> = (args) => <NotificationsList {...args} />;

export const Default = Template.bind({});
Default.args = {
  notifications,
};

export const Empty = Template.bind({});
Empty.args = {
  notifications: [],
};

export const DefaultDark = Template.bind({});
DefaultDark.args = {
  notifications,
};
DefaultDark.decorators = [ThemeDecorator(Theme.DARK)];

export const EmptyDark = Template.bind({});
EmptyDark.args = {
  notifications: [],
};
EmptyDark.decorators = [ThemeDecorator(Theme.DARK)];
