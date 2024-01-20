import { ComponentStory, ComponentMeta } from '@storybook/react';
import { mockArticle } from '@/5_entities/Article';
import { ThemeDecorator } from '@/6_shared/config/storybook/ThemeDecorator';
import { StoreDecorator } from '@/6_shared/config/storybook/StoreDecorator';
import { Theme } from '@/6_shared/utils/theme';
import { ArticleDetailsBlock } from './ArticleDetailsBlock';

export default {
  title: '2_pages/ArticleDetailsPage/ArticleDetailsBlock',
  component: ArticleDetailsBlock,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  decorators: [
    StoreDecorator({
      article: {
        data: mockArticle(),
      },
    }),
  ],
} as ComponentMeta<typeof ArticleDetailsBlock>;

const Template: ComponentStory<typeof ArticleDetailsBlock> = (args) => <ArticleDetailsBlock {...args} />;

export const Default = Template.bind({});
Default.args = {};

export const DefaultDark = Template.bind({});
DefaultDark.args = {};
DefaultDark.decorators = [ThemeDecorator(Theme.DARK)];
