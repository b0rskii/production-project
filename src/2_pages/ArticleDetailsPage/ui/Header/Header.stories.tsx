import { ComponentStory, ComponentMeta } from '@storybook/react';
import { StoreDecorator } from '6_shared/config/storybook/StoreDecorator';
import { ThemeDecorator } from '6_shared/config/storybook/ThemeDecorator';
import { Theme } from '6_shared/utils/theme';
import { Header } from './Header';

export default {
  title: '2_pages/ArticleDetailsPage/Header',
  component: Header,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  decorators: [
    StoreDecorator({}),
  ],
} as ComponentMeta<typeof Header>;

const Template: ComponentStory<typeof Header> = (args) => <Header {...args} />;

export const Default = Template.bind({});
Default.args = {};

export const DefaultDark = Template.bind({});
DefaultDark.args = {};
DefaultDark.decorators = [ThemeDecorator(Theme.DARK)];
