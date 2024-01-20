import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ThemeDecorator } from '@/6_shared/config/storybook/ThemeDecorator';
import { Theme } from '@/6_shared/utils/theme';
import { Stack } from './Stack';

export default {
  title: '6_shared/Stack',
  component: Stack,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: {
    children: (
      <>
        <div style={{ border: '2px solid red' }}>Первый элемент</div>
        <div style={{ border: '2px solid red' }}>Второй элемент</div>
        <div style={{ border: '2px solid red' }}>Третий элемент</div>
        <div style={{ border: '2px solid red' }}>Четвертый элемент</div>
        <div style={{ border: '2px solid red' }}>Пятый элемент</div>
      </>
    ),
  },
} as ComponentMeta<typeof Stack>;

const Template: ComponentStory<typeof Stack> = (args) => <Stack {...args} />;

export const Default = Template.bind({});
Default.args = {};

export const DefaultDark = Template.bind({});
DefaultDark.args = {};
DefaultDark.decorators = [ThemeDecorator(Theme.DARK)];
