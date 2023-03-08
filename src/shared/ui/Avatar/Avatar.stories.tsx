import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator';
import { Theme } from 'shared/utils/theme';
import { Avatar } from './Avatar';

const AVATAR_URL = 'https://pic.rutubelist.ru/user/3b/27/3b2758ad5492a76b578f7ee072e4e894.jpg';

export default {
  title: 'shared/Avatar',
  component: Avatar,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof Avatar>;

const Template: ComponentStory<typeof Avatar> = (args) => <Avatar {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  src: AVATAR_URL,
};

export const Small = Template.bind({});
Small.args = {
  size: 50,
  src: AVATAR_URL,
};

export const PrimaryDark = Template.bind({});
PrimaryDark.args = {
  src: AVATAR_URL,
};
PrimaryDark.decorators = [ThemeDecorator(Theme.DARK)];

export const SmallDark = Template.bind({});
SmallDark.args = {
  size: 50,
  src: AVATAR_URL,
};
SmallDark.decorators = [ThemeDecorator(Theme.DARK)];
