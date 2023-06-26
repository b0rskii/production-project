import { ComponentStory, ComponentMeta } from '@storybook/react';
import { mockArticles } from '../../model/mocks';
import { ArticlesList } from './ArticlesList';

const tilesArticles = mockArticles(10);
const listArticles = mockArticles(3);

export default {
  title: '5_entities/ArticlesList',
  component: ArticlesList,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof ArticlesList>;

const Template: ComponentStory<typeof ArticlesList> = (args) => <ArticlesList {...args} />;

export const TilesView = Template.bind({});
TilesView.args = {
  articles: tilesArticles,
  view: 'tiles',
};

export const ListView = Template.bind({});
ListView.args = {
  articles: listArticles,
  view: 'list',
};

export const Empty = Template.bind({});
Empty.args = {
  articles: [],
};

export const TilesViewLoading = Template.bind({});
TilesViewLoading.args = {
  articles: [],
  view: 'tiles',
  isLoading: true,
  skeletonsCount: tilesArticles.length,
};

export const ListViewLoading = Template.bind({});
ListViewLoading.args = {
  articles: [],
  view: 'list',
  isLoading: true,
  skeletonsCount: listArticles.length,
};

export const Error = Template.bind({});
Error.args = {
  articles: [],
  error: 'error',
};
