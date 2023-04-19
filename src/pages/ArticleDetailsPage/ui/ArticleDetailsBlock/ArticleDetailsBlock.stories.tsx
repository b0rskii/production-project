import { ComponentStory, ComponentMeta } from '@storybook/react';
import { mockArticle } from 'entities/Article';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator';
import { StoreDecorator } from 'shared/config/storybook/StoreDecorator';
import { Theme } from 'shared/utils/theme';
import { ArticleDetailsBlock } from './ArticleDetailsBlock';

export default {
  title: 'pages/ArticleDetailsBlock',
  component: ArticleDetailsBlock,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  decorators: [StoreDecorator({
    article: {
      data: mockArticle,
    },
  })],
} as ComponentMeta<typeof ArticleDetailsBlock>;

const Template: ComponentStory<typeof ArticleDetailsBlock> = (args) => <ArticleDetailsBlock {...args} />;

export const Default = Template.bind({});
Default.args = {};

export const DefaultDark = Template.bind({});
DefaultDark.args = {};
DefaultDark.decorators = [ThemeDecorator(Theme.DARK)];
