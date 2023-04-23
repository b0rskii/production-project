import { ComponentStory, ComponentMeta } from '@storybook/react';
import { mockArticle } from 'entities/Article';
import { mockNormalizedArticleComments } from 'entities/ArticleComment';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator';
import { StoreDecorator } from 'shared/config/storybook/StoreDecorator';
import { Theme } from 'shared/utils/theme';
import { ArticleCommentsBlock } from './ArticleCommentsBlock';

const { ids, entities } = mockNormalizedArticleComments(3);

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
    articleComments: { ids, entities },
  }),
];

export const NoArticle = Template.bind({});
NoArticle.args = {};
NoArticle.decorators = [
  StoreDecorator({
    article: { data: null },
    articleComments: { ids, entities },
  }),
];

export const DefaultDark = Template.bind({});
DefaultDark.args = {};
DefaultDark.decorators = [
  StoreDecorator({
    article: { data: mockArticle },
    articleComments: { ids, entities },
  }),
  ThemeDecorator(Theme.DARK),
];
