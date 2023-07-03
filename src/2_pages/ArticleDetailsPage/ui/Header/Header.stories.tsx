import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ThemeDecorator } from '6_shared/config/storybook/ThemeDecorator';
import { Theme } from '6_shared/utils/theme';
import { Header } from './Header';

export default {
  title: '2_pages/ArticleDetailsPage/Header',
  component: Header,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof Header>;

// eslint-disable-next-line react/jsx-props-no-spreading
const Template: ComponentStory<typeof Header> = (args) => <Header {...args} />;

export const Default = Template.bind({});
Default.args = {};

export const DefaultDark = Template.bind({});
DefaultDark.args = {};
DefaultDark.decorators = [ThemeDecorator(Theme.DARK)];
