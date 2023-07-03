import { ComponentStory, ComponentMeta } from '@storybook/react';
import { mockNormalizedArticles } from '5_entities/Article';
import { ThemeDecorator } from '6_shared/config/storybook/ThemeDecorator';
import { StoreDecorator } from '6_shared/config/storybook/StoreDecorator';
import { Theme } from '6_shared/utils/theme';
import { RecomendationsBlock } from './RecomendationsBlock';

const normalizedArticles = mockNormalizedArticles(4);

export default {
  title: '2_pages/ArticleDetailsPage/RecomendationsBlock',
  component: RecomendationsBlock,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  decorators: [
    StoreDecorator({
      recommendedArticles: {
        ids: normalizedArticles.ids,
        entities: normalizedArticles.entities,
      },
    }),
  ],
} as ComponentMeta<typeof RecomendationsBlock>;

// eslint-disable-next-line react/jsx-props-no-spreading
const Template: ComponentStory<typeof RecomendationsBlock> = (args) => <RecomendationsBlock {...args} />;

export const Default = Template.bind({});
Default.args = {};

export const DefaultDark = Template.bind({});
DefaultDark.args = {};
DefaultDark.decorators = [ThemeDecorator(Theme.DARK)];
