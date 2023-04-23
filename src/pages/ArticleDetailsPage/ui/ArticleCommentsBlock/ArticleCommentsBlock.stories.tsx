import { ComponentStory, ComponentMeta } from '@storybook/react';
import { mockArticle } from 'entities/Article';
import { mockArticleComments } from 'entities/ArticleComment';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator';
import { StoreDecorator } from 'shared/config/storybook/StoreDecorator';
import { Theme } from 'shared/utils/theme';
import { ArticleCommentsBlock } from './ArticleCommentsBlock';

const articleComments = mockArticleComments(3);

export default {
  title: 'pages/ArticleDetailsPage/ArticleCommentsBlock',
  component: ArticleCommentsBlock,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof ArticleCommentsBlock>;

const Template: ComponentStory<typeof ArticleCommentsBlock> = (args) => <ArticleCommentsBlock {...args} />;

export const Default = Template.bind({});
Default.args = {};
Default.decorators = [
  StoreDecorator({
    article: { data: mockArticle },
    articleComments: { data: articleComments },
  }),
];

export const NoArticle = Template.bind({});
NoArticle.args = {};
NoArticle.decorators = [
  StoreDecorator({
    article: { data: null },
    articleComments: { data: articleComments },
  }),
];

export const DefaultDark = Template.bind({});
DefaultDark.args = {};
DefaultDark.decorators = [
  StoreDecorator({
    article: { data: mockArticle },
    articleComments: { data: articleComments },
  }),
  ThemeDecorator(Theme.DARK),
];
