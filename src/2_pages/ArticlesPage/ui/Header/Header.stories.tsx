import { ComponentStory, ComponentMeta } from '@storybook/react';
import { mockNormalizedArticles } from '5_entities/Article';
import { ThemeDecorator } from '6_shared/config/storybook/ThemeDecorator';
import { StoreDecorator } from '6_shared/config/storybook/StoreDecorator';
import { Theme } from '6_shared/utils/theme';
import { Header } from './Header';

const normalizedArticles = mockNormalizedArticles(5);

export default {
  title: '2_pages/ArticlesPage/Header',
  component: Header,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof Header>;

const Template: ComponentStory<typeof Header> = (args) => <Header {...args} />;

export const Default = Template.bind({});
Default.args = {};
Default.decorators = [
  StoreDecorator({
    articles: {
      ids: normalizedArticles.ids,
      entities: normalizedArticles.entities,
      view: 'list',
    },
  }),
];

export const NoArticles = Template.bind({});
NoArticles.args = {};
NoArticles.decorators = [
  StoreDecorator({
    articles: {
      ids: [],
      entities: {},
      view: 'list',
    },
  }),
];

export const DefaultDark = Template.bind({});
DefaultDark.args = {};
DefaultDark.decorators = [
  StoreDecorator({
    articles: {
      ids: normalizedArticles.ids,
      entities: normalizedArticles.entities,
      view: 'list',
    },
  }),
  ThemeDecorator(Theme.DARK),
];

export const NoArticlesDark = Template.bind({});
NoArticlesDark.args = {};
NoArticlesDark.decorators = [
  StoreDecorator({
    articles: {
      ids: [],
      entities: {},
      view: 'list',
    },
  }),
  ThemeDecorator(Theme.DARK),
];
