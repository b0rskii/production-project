import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ThemeDecorator } from '@/6_shared/config/storybook/ThemeDecorator';
import { Theme } from '@/6_shared/utils/theme';
import { Skeleton } from './Skeleton';

export default {
  title: '6_shared/Skeleton',
  component: Skeleton,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: {
    height: 200,
  },
} as ComponentMeta<typeof Skeleton>;

const Template: ComponentStory<typeof Skeleton> = (args) => <Skeleton {...args} />;

export const Default = Template.bind({});
Default.args = {
  width: '100%',
};

export const Round = Template.bind({});
Round.args = {
  width: 200,
  borderRadius: '50%',
};

export const DefaultDark = Template.bind({});
DefaultDark.args = {
  width: '100%',
};
DefaultDark.decorators = [ThemeDecorator(Theme.DARK)];

export const RoundDark = Template.bind({});
RoundDark.args = {
  width: 200,
  borderRadius: '50%',
};
RoundDark.decorators = [ThemeDecorator(Theme.DARK)];
