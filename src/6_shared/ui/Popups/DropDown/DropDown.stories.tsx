/* eslint-disable react/jsx-props-no-spreading */
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ThemeDecorator } from '6_shared/config/storybook/ThemeDecorator';
import { Theme } from '6_shared/utils/theme';
import { Avatar } from '6_shared/ui/Avatar';
import { DropDown } from './DropDown';

const AVATAR_URL = 'https://pic.rutubelist.ru/user/3b/27/3b2758ad5492a76b578f7ee072e4e894.jpg';

export default {
  title: '6_shared/DropDown',
  component: DropDown,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: {
    button: (
      <Avatar
        src={AVATAR_URL}
        alt="avatar"
        size={35}
      />
    ),
    items: [
      { content: 'Профиль' },
      { content: 'Премиум', disabled: true },
      { content: 'Выйти' },
    ],
  },
} as ComponentMeta<typeof DropDown>;

const Template: ComponentStory<typeof DropDown> = (args) => (
  <div style={{ display: 'flex', justifyContent: 'center' }}>
    <DropDown {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {};

export const LeftDirection = Template.bind({});
LeftDirection.args = {
  direction: 'left',
};

export const DefaultDark = Template.bind({});
DefaultDark.args = {};
DefaultDark.decorators = [ThemeDecorator(Theme.DARK)];

export const LeftDirectionDark = Template.bind({});
LeftDirectionDark.args = {
  direction: 'left',
};
LeftDirectionDark.decorators = [ThemeDecorator(Theme.DARK)];
