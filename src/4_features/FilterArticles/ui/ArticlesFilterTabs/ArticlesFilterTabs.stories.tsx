import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ArticleType } from '5_entities/Article';
import { StoreDecorator } from '6_shared/config/storybook/StoreDecorator';
import { ThemeDecorator } from '6_shared/config/storybook/ThemeDecorator';
import { Theme } from '6_shared/utils/theme';
import { ArticlesFilterTabs } from './ArticlesFilterTabs';

export default {
  title: '4_features/FilterArticles/ArticlesFilterTabs',
  component: ArticlesFilterTabs,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  decorators: [
    StoreDecorator({
      filterArticles: {
        type: ArticleType.ALL,
      },
    }),
  ],
} as ComponentMeta<typeof ArticlesFilterTabs>;

const Template: ComponentStory<typeof ArticlesFilterTabs> = (args) => <ArticlesFilterTabs {...args} />;

export const Default = Template.bind({});
Default.args = {};

export const DefaultDark = Template.bind({});
DefaultDark.args = {};
DefaultDark.decorators = [ThemeDecorator(Theme.DARK)];
