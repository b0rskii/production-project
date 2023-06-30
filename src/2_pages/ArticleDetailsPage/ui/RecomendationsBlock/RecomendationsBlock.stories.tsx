import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ThemeDecorator } from '6_shared/config/storybook/ThemeDecorator';
import { Theme } from '6_shared/utils/theme';
import { RecomendationsBlock } from './RecomendationsBlock';

export default {
  title: '2_pages/ArticleDetailsPage/RecomendationsBlock',
  component: RecomendationsBlock,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof RecomendationsBlock>;

// eslint-disable-next-line react/jsx-props-no-spreading
const Template: ComponentStory<typeof RecomendationsBlock> = (args) => <RecomendationsBlock {...args} />;

export const Default = Template.bind({});
Default.args = {};

export const DefaultDark = Template.bind({});
DefaultDark.args = {};
DefaultDark.decorators = [ThemeDecorator(Theme.DARK)];
