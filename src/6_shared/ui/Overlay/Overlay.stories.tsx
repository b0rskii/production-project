import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ThemeDecorator } from '6_shared/config/storybook/ThemeDecorator';
import { Theme } from '6_shared/utils/theme';
import { Overlay } from './Overlay';

export default {
  title: '5_entities/Overlay',
  component: Overlay,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof Overlay>;

// eslint-disable-next-line react/jsx-props-no-spreading
const Template: ComponentStory<typeof Overlay> = (args) => <Overlay {...args} />;

export const Default = Template.bind({});
Default.args = {};

export const DefaultDark = Template.bind({});
DefaultDark.args = {};
DefaultDark.decorators = [ThemeDecorator(Theme.DARK)];
