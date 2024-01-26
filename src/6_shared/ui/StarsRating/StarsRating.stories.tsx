import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ThemeDecorator } from '@/6_shared/config/storybook/ThemeDecorator';
import { Theme } from '@/6_shared/utils/theme';
import { StarsRating } from './StarsRating';

export default {
  title: '5_entities/StarsRating',
  component: StarsRating,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof StarsRating>;

// eslint-disable-next-line react/jsx-props-no-spreading
const Template: ComponentStory<typeof StarsRating> = (args) => <StarsRating {...args} />;

export const Default = Template.bind({});
Default.args = {};

export const DefaultDark = Template.bind({});
DefaultDark.args = {};
DefaultDark.decorators = [ThemeDecorator(Theme.DARK)];
