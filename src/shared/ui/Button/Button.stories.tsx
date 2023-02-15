import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Button, ThemeButton } from './Button';

export default {
  title: 'shared/Button',
  component: Button,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: {
    children: 'Text',
  },
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {};

export const Clear = Template.bind({});
Clear.args = {
  them: ThemeButton.CLEAR,
};

export const Outline = Template.bind({});
Outline.args = {
  them: ThemeButton.OUTLINE,
};
