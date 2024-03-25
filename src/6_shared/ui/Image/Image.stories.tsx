import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ThemeDecorator } from '@/6_shared/config/storybook/ThemeDecorator';
import { Theme } from '@/6_shared/utils/theme';
import { Image } from './Image';

export default {
  title: '5_entities/Image',
  component: Image,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof Image>;

// eslint-disable-next-line react/jsx-props-no-spreading
const Template: ComponentStory<typeof Image> = (args) => <Image {...args} />;

export const Default = Template.bind({});
Default.args = {};

export const DefaultDark = Template.bind({});
DefaultDark.args = {};
DefaultDark.decorators = [ThemeDecorator(Theme.DARK)];
