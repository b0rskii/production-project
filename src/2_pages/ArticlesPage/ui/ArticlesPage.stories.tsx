import { ComponentStory, ComponentMeta } from '@storybook/react';
import { mockNormalizedArticles } from '5_entities/Article';
import { StoreDecorator } from '6_shared/config/storybook/StoreDecorator';
import { ThemeDecorator } from '6_shared/config/storybook/ThemeDecorator';
import { Theme } from '6_shared/utils/theme';
import ArticlesPage from './ArticlesPage';

const normalizedArticles = mockNormalizedArticles(10);

export default {
  title: '2_pages/ArticlesPage',
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
