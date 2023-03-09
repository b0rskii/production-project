import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator';
import { Input } from 'shared/ui/Input';
import { Theme } from 'shared/utils/theme';
import { ProfileRow } from './ProfileRow';

const VALUE = 'Вася';

export default {
  title: 'entities/ProfileRow',
  component: ProfileRow,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: {
    name: 'Имя',
    value: VALUE,
    children: <Input value={VALUE} />,
  },
} as ComponentMeta<typeof ProfileRow>;

const Template: ComponentStory<typeof ProfileRow> = (args) => <ProfileRow {...args} />;

export const Readonly = Template.bind({});
Readonly.args = {};

export const Editing = Template.bind({});
Editing.args = {
  isReadonly: false,
};

export const ReadonlyDark = Template.bind({});
ReadonlyDark.args = {};
ReadonlyDark.decorators = [ThemeDecorator(Theme.DARK)];

export const EditingDark = Template.bind({});
EditingDark.args = {
  isReadonly: false,
};
EditingDark.decorators = [ThemeDecorator(Theme.DARK)];
