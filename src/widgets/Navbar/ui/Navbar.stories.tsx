import { ComponentStory, ComponentMeta } from '@storybook/react';
import { StoreDecorator } from 'shared/config/storybook/StoreDecorator';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator';
import { Theme } from 'shared/utils/theme';
import { Navbar } from './Navbar';

export default {
  title: 'widgets/Navbar',
  component: Navbar,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof Navbar>;

const Template: ComponentStory<typeof Navbar> = (args) => <Navbar {...args} />;

export const Default = Template.bind({});
Default.args = {};
Default.decorators = [StoreDecorator({
  user: { authData: undefined },
})];

export const Logged = Template.bind({});
Logged.args = {};
Logged.decorators = [StoreDecorator({
  user: { authData: { id: 'name', name: 'name', password: 'pass' } },
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
    user: { authData: { id: 'name', name: 'name', password: 'pass' } },
  }),
];
