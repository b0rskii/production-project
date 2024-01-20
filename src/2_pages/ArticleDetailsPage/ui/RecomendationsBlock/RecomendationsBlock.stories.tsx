import { ComponentStory, ComponentMeta } from '@storybook/react';
import withMock from 'storybook-addon-mock';
import { mockArticles } from '@/5_entities/Article';
import { ThemeDecorator } from '@/6_shared/config/storybook/ThemeDecorator';
import { StoreDecorator } from '@/6_shared/config/storybook/StoreDecorator';
import { Theme } from '@/6_shared/utils/theme';
import { ApiRoutes } from '@/6_shared/api';
import { RecomendationsBlock } from './RecomendationsBlock';

const LIMIT = 4;
const articles = mockArticles(4);

export default {
  title: '2_pages/ArticleDetailsPage/RecomendationsBlock',
  component: RecomendationsBlock,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  decorators: [
    StoreDecorator({
      recommendedArticles: {
        limit: LIMIT,
      },
    }),
    withMock,
  ],
  parameters: {
    mockData: [
      {
        url: `${__API__}${ApiRoutes.ARTICLES}?_limit=${LIMIT}`,
        method: 'GET',
        status: 200,
        response: {
          data: articles,
        },
      },
    ],
  },
} as ComponentMeta<typeof RecomendationsBlock>;

const Template: ComponentStory<typeof RecomendationsBlock> = (args) => <RecomendationsBlock {...args} />;

export const Default = Template.bind({});
Default.args = {};

export const DefaultDark = Template.bind({});
DefaultDark.args = {};
DefaultDark.decorators = [ThemeDecorator(Theme.DARK)];
