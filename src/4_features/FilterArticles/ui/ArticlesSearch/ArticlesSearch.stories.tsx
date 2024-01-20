import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ThemeDecorator } from '@/6_shared/config/storybook/ThemeDecorator';
import { Theme } from '@/6_shared/utils/theme';
import { ArticlesSearch } from './ArticlesSearch';

export default {
  title: '4_features/FilterArticles/ArticlesSearch',
  component: ArticlesSearch,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof ArticlesSearch>;

const Template: ComponentStory<typeof ArticlesSearch> = (args) => <ArticlesSearch {...args} />;

export const Default = Template.bind({});
Default.args = {};

export const DefaultDark = Template.bind({});
DefaultDark.args = {};
DefaultDark.decorators = [ThemeDecorator(Theme.DARK)];
