import { ComponentStory, ComponentMeta } from '@storybook/react';
import { mockArticle } from '5_entities/Article';
import { mockNormalizedArticleComments } from '5_entities/ArticleComment';
import { ThemeDecorator } from '6_shared/config/storybook/ThemeDecorator';
import { StoreDecorator } from '6_shared/config/storybook/StoreDecorator';
import { Theme } from '6_shared/utils/theme';
import ArticleCommentsBlock from './ArticleCommentsBlock';

const { ids, entities } = mockNormalizedArticleComments(3);

export default {
  title: '2_pages/ArticleDetailsPage/ArticleCommentsBlock',
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
    article: { data: mockArticle() },
    articleComments: { ids, entities },
  }),
];

export const DefaultDark = Template.bind({});
DefaultDark.args = {};
DefaultDark.decorators = [
  StoreDecorator({
    article: { data: mockArticle() },
    articleComments: { ids, entities },
  }),
  ThemeDecorator(Theme.DARK),
];
