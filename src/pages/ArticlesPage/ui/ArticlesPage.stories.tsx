import { ComponentStory, ComponentMeta } from '@storybook/react';
import { mockNormalizedArticles } from 'entities/Article';
import { StoreDecorator } from 'shared/config/storybook/StoreDecorator';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator';
import { Theme } from 'shared/utils/theme';
import ArticlesPage from './ArticlesPage';

const normalizedArticles = mockNormalizedArticles(10);

export default {
  title: 'pages/ArticlesPage',
  component: ArticlesPage,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  decorators: [
    StoreDecorator({
      articles: {
        ids: normalizedArticles.ids,
        entities: normalizedArticles.entities,
        isHasMore: true,
        isLoading: false,
        error: null,
        view: 'tiles',
      },
    }),
  ],
} as ComponentMeta<typeof ArticlesPage>;

const Template: ComponentStory<typeof ArticlesPage> = () => <ArticlesPage />;

export const Default = Template.bind({});
Default.args = {};

export const DefaultDark = Template.bind({});
DefaultDark.args = {};
DefaultDark.decorators = [ThemeDecorator(Theme.DARK)];
