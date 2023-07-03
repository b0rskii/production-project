import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ThemeDecorator } from '6_shared/config/storybook/ThemeDecorator';
import { Theme } from '6_shared/utils/theme';
import { mockArticle } from '../../model/mocks';
import { Article } from './Article';

export default {
  title: '5_entities/Article/Article',
  component: Article,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: {
    data: mockArticle(),
  },
} as ComponentMeta<typeof Article>;

const Template: ComponentStory<typeof Article> = (args) => <Article {...args} />;

export const TileArticle = Template.bind({});
TileArticle.args = {
  view: 'tiles',
};

export const ListArticle = Template.bind({});
ListArticle.args = {
  view: 'list',
};

export const TileArticleDark = Template.bind({});
TileArticleDark.args = {
  view: 'tiles',
};
TileArticleDark.decorators = [ThemeDecorator(Theme.DARK)];

export const ListArticleDark = Template.bind({});
ListArticleDark.args = {
  view: 'list',
};
ListArticleDark.decorators = [ThemeDecorator(Theme.DARK)];
