import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ThemeDecorator } from '6_shared/config/storybook/ThemeDecorator';
import { Theme } from '6_shared/utils/theme';
import { ArticlesSorting } from './ArticlesSorting';

export default {
  title: '4_features/SortArticles/ArticlesSorting',
  component: ArticlesSorting,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof ArticlesSorting>;

const Template: ComponentStory<typeof ArticlesSorting> = (args) => <ArticlesSorting {...args} />;

export const Default = Template.bind({});
Default.args = {};

export const DefaultDark = Template.bind({});
DefaultDark.args = {};
DefaultDark.decorators = [ThemeDecorator(Theme.DARK)];
