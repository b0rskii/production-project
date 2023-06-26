import { ComponentStory, ComponentMeta } from '@storybook/react';
import { mockArticle } from '5_entities/Article';
import { mockNormalizedArticleComments } from '5_entities/ArticleComment';
import { ThemeDecorator } from '6_shared/config/storybook/ThemeDecorator';
import { StoreDecorator } from '6_shared/config/storybook/StoreDecorator';
import { Theme } from '6_shared/utils/theme';
import ArticleDetailsPage from './ArticleDetailsPage';

const { ids, entities } = mockNormalizedArticleComments(3);

export default {
  title: '2_pages/ArticleDetailsPage',
  component: ArticleDetailsPage,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  decorators: [
    StoreDecorator({
      article: {
        data: mockArticle(),
      },
      articleComments: {
        ids,
        entities,
      },
    }),
  ],
} as ComponentMeta<typeof ArticleDetailsPage>;

const Template: ComponentStory<typeof ArticleDetailsPage> = (args) => <ArticleDetailsPage {...args} />;

export const Default = Template.bind({});
Default.args = {};

export const DefaultDark = Template.bind({});
DefaultDark.args = {};
DefaultDark.decorators = [ThemeDecorator(Theme.DARK)];
