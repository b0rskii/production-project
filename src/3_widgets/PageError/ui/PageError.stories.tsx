import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ThemeDecorator } from '@/6_shared/config/storybook/ThemeDecorator';
import { Theme } from '@/6_shared/utils/theme';
import { PageError } from './PageError';

export default {
  title: '3_widgets/PageError',
  component: PageError,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof PageError>;

const Template: ComponentStory<typeof PageError> = (args) => <PageError {...args} />;

export const Default = Template.bind({});
Default.args = {};

export const DefaultDark = Template.bind({});
DefaultDark.args = {};
DefaultDark.decorators = [ThemeDecorator(Theme.DARK)];
