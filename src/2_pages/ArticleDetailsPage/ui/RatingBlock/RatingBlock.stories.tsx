import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ThemeDecorator } from '@/6_shared/config/storybook/ThemeDecorator';
import { Theme } from '@/6_shared/utils/theme';
import { RatingBlock } from './RatingBlock';

export default {
  title: '5_entities/RatingBlock',
  component: RatingBlock,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof RatingBlock>;

// eslint-disable-next-line react/jsx-props-no-spreading
const Template: ComponentStory<typeof RatingBlock> = (args) => <RatingBlock {...args} />;

export const Default = Template.bind({});
Default.args = {};

export const DefaultDark = Template.bind({});
DefaultDark.args = {};
DefaultDark.decorators = [ThemeDecorator(Theme.DARK)];
