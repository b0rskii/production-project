import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ThemeDecorator } from '6_shared/config/storybook/ThemeDecorator';
import { Theme } from '6_shared/utils/theme';
import { Notification } from './Notification';

export default {
  title: '5_entities/Notification',
  component: Notification,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof Notification>;

const Template: ComponentStory<typeof Notification> = (args) => <Notification {...args} />;

export const Default = Template.bind({});
Default.args = {};

export const DefaultDark = Template.bind({});
DefaultDark.args = {};
DefaultDark.decorators = [ThemeDecorator(Theme.DARK)];
