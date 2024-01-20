import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ThemeDecorator } from '@/6_shared/config/storybook/ThemeDecorator';
import { Theme } from '@/6_shared/utils/theme';
import { Button, ButtonTheme } from './Button';

export default {
  title: '6_shared/Button',
  component: Button,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: {
    children: 'Text',
  },
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Default = Template.bind({});
Default.args = {};

export const Clear = Template.bind({});
Clear.args = {
  theme: ButtonTheme.CLEAR,
};

export const ClearInverted = Template.bind({});
ClearInverted.args = {
  theme: ButtonTheme.CLEAR_INVERTED,
};

export const Outline = Template.bind({});
Outline.args = {
  theme: ButtonTheme.OUTLINE,
};

export const OutlineRed = Template.bind({});
OutlineRed.args = {
  theme: ButtonTheme.OUTLINE_RED,
};

export const Background = Template.bind({});
Background.args = {
  theme: ButtonTheme.BACKGROUND,
};

export const BackgroundInverted = Template.bind({});
BackgroundInverted.args = {
  theme: ButtonTheme.BACKGROUND_INVERTED,
};

export const Square = Template.bind({});
Square.args = {
  children: '>',
  theme: ButtonTheme.OUTLINE,
  square: true,
};

export const SquareSizeM = Template.bind({});
SquareSizeM.args = {
  children: '>',
  theme: ButtonTheme.OUTLINE,
  size: 'm',
  square: true,
};

export const SquareSizeL = Template.bind({});
SquareSizeL.args = {
  children: '>',
  theme: ButtonTheme.OUTLINE,
  size: 'l',
  square: true,
};

export const SquareSizeXL = Template.bind({});
SquareSizeXL.args = {
  children: '>',
  theme: ButtonTheme.OUTLINE,
  size: 'xl',
  square: true,
};

export const Disabled = Template.bind({});
Disabled.args = {
  theme: ButtonTheme.OUTLINE,
  disabled: true,
};

export const DefaultDark = Template.bind({});
DefaultDark.args = {};
DefaultDark.decorators = [ThemeDecorator(Theme.DARK)];

export const ClearDark = Template.bind({});
ClearDark.args = {
  theme: ButtonTheme.CLEAR,
};
ClearDark.decorators = [ThemeDecorator(Theme.DARK)];

export const ClearInvertedDark = Template.bind({});
ClearInvertedDark.args = {
  theme: ButtonTheme.CLEAR_INVERTED,
};
ClearInvertedDark.decorators = [ThemeDecorator(Theme.DARK)];

export const OutlineDark = Template.bind({});
OutlineDark.args = {
  theme: ButtonTheme.OUTLINE,
};
OutlineDark.decorators = [ThemeDecorator(Theme.DARK)];

export const OutlineRedDark = Template.bind({});
OutlineRedDark.args = {
  theme: ButtonTheme.OUTLINE_RED,
};
OutlineRedDark.decorators = [ThemeDecorator(Theme.DARK)];

export const BackgroundDark = Template.bind({});
BackgroundDark.args = {
  theme: ButtonTheme.BACKGROUND,
};
BackgroundDark.decorators = [ThemeDecorator(Theme.DARK)];

export const BackgroundInvertedDark = Template.bind({});
BackgroundInvertedDark.args = {
  theme: ButtonTheme.BACKGROUND_INVERTED,
};
BackgroundInvertedDark.decorators = [ThemeDecorator(Theme.DARK)];

export const DisabledDark = Template.bind({});
DisabledDark.args = {
  theme: ButtonTheme.OUTLINE,
  disabled: true,
};
DisabledDark.decorators = [ThemeDecorator(Theme.DARK)];
