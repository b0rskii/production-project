import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ThemeDecorator } from '6_shared/config/storybook/ThemeDecorator';
import { Theme } from '6_shared/utils/theme';
import { Text, TextTheme } from './Text';

export default {
  title: '6_shared/Text',
  component: Text,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof Text>;

const Template: ComponentStory<typeof Text> = (args) => <Text {...args} />;

export const Default = Template.bind({});
Default.args = {
  title: 'Title',
  text: 'text',
};

export const OnlyTitle = Template.bind({});
OnlyTitle.args = {
  title: 'Title',
};

export const OnlyText = Template.bind({});
OnlyText.args = {
  text: 'text',
};

export const Error = Template.bind({});
Error.args = {
  title: 'Title',
  text: 'text',
  theme: TextTheme.ERROR,
};

export const SizeL = Template.bind({});
SizeL.args = {
  title: 'Title',
  text: 'text',
  size: 'l',
};

export const DefaultDark = Template.bind({});
DefaultDark.args = {
  title: 'Title',
  text: 'text',
};
DefaultDark.decorators = [ThemeDecorator(Theme.DARK)];

export const OnlyTitleDark = Template.bind({});
OnlyTitleDark.args = {
  title: 'Title',
};
OnlyTitleDark.decorators = [ThemeDecorator(Theme.DARK)];

export const OnlyTextDark = Template.bind({});
OnlyTextDark.args = {
  text: 'text',
};
OnlyTextDark.decorators = [ThemeDecorator(Theme.DARK)];

export const ErrorDark = Template.bind({});
ErrorDark.args = {
  title: 'Title',
  text: 'text',
  theme: TextTheme.ERROR,
};
ErrorDark.decorators = [ThemeDecorator(Theme.DARK)];

export const SizeLDark = Template.bind({});
SizeLDark.args = {
  title: 'Title',
  text: 'text',
  size: 'l',
};
SizeLDark.decorators = [ThemeDecorator(Theme.DARK)];
