import { ComponentStory, ComponentMeta } from '@storybook/react';
import { mockUser } from '5_entities/User';
import { StoreDecorator } from '6_shared/config/storybook/StoreDecorator';
import { ThemeDecorator } from '6_shared/config/storybook/ThemeDecorator';
import { Theme } from '6_shared/utils/theme';
import { Navbar } from './Navbar';

export default {
  title: '3_widgets/Navbar',
  component: Navbar,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof Navbar>;

// eslint-disable-next-line react/jsx-props-no-spreading
const Template: ComponentStory<typeof Navbar> = (args) => <Navbar {...args} />;

export const Default = Template.bind({});
Default.args = {};
Default.decorators = [
  StoreDecorator({}),
];

export const DefaultDark = Template.bind({});
DefaultDark.args = {};
DefaultDark.decorators = [
  ThemeDecorator(Theme.DARK),
  StoreDecorator({}),
];

export const Authorized = Template.bind({});
Authorized.args = {};
Authorized.decorators = [
  StoreDecorator({
    user: {
      authData: mockUser(),
    },
  }),
];

export const AuthorizedDark = Template.bind({});
AuthorizedDark.args = {};
AuthorizedDark.decorators = [
  ThemeDecorator(Theme.DARK),
  StoreDecorator({
    user: {
      authData: mockUser(),
    },
  }),
];
