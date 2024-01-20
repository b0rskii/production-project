import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ThemeDecorator } from '@/6_shared/config/storybook/ThemeDecorator';
import { Input } from '@/6_shared/ui/Input';
import { Theme } from '@/6_shared/utils/theme';
import { ProfileRow } from './ProfileRow';

const VALUE = 'Вася';

export default {
  title: '5_entities/Profile/ProfileRow',
  component: ProfileRow,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: {
    name: 'Имя',
    children: <Input value={VALUE} />,
  },
} as ComponentMeta<typeof ProfileRow>;

const Template: ComponentStory<typeof ProfileRow> = (args) => <ProfileRow {...args} />;

export const Default = Template.bind({});
Default.args = {};

export const DefaultDark = Template.bind({});
DefaultDark.args = {};
DefaultDark.decorators = [ThemeDecorator(Theme.DARK)];
