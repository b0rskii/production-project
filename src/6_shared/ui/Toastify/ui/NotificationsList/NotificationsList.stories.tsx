import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ThemeDecorator } from '6_shared/config/storybook/ThemeDecorator';
import { Theme } from '6_shared/utils/theme';
import { NotificationsList } from './NotificationsList';
import { ToastifyItem } from '../Notification';

const notification: ToastifyItem = { text: 'Операция прошла успешно', type: 'success' };
const notifications = [notification, notification, notification];

export default {
  title: '6_shared/NotificationsList',
  component: NotificationsList,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof NotificationsList>;

// eslint-disable-next-line react/jsx-props-no-spreading
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
