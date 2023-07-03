import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ThemeDecorator } from '6_shared/config/storybook/ThemeDecorator';
import { Theme } from '6_shared/utils/theme';
import { Tabs } from './Tabs';

export default {
  title: '6_shared/Tabs',
  component: Tabs,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: {
    activeTab: 'Tab 1',
    tabs: [
      { value: 'Tab 1', content: 'Tab 1' },
      { value: 'Tab 2', content: 'Tab 2' },
      { value: 'Tab 3', content: 'Tab 3' },
    ],
  },
} as ComponentMeta<typeof Tabs>;

// eslint-disable-next-line react/jsx-props-no-spreading
const Template: ComponentStory<typeof Tabs> = (args) => <Tabs {...args} />;

export const Default = Template.bind({});
Default.args = {};

export const DefaultDark = Template.bind({});
DefaultDark.args = {};
DefaultDark.decorators = [ThemeDecorator(Theme.DARK)];
