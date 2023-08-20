import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ThemeDecorator } from '6_shared/config/storybook/ThemeDecorator';
import { Theme } from '6_shared/utils/theme';
import { FetchError } from './FetchError';

export default {
  title: '6_shared/FetchError',
  component: FetchError,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: {
    message: 'При загрузке данных произошла ошибка',
  },
} as ComponentMeta<typeof FetchError>;

// eslint-disable-next-line react/jsx-props-no-spreading
const Template: ComponentStory<typeof FetchError> = (args) => <FetchError {...args} />;

export const Default = Template.bind({});
Default.args = {};

export const WithoutButton = Template.bind({});
WithoutButton.args = {
  onRepeat: undefined,
};

export const DefaultDark = Template.bind({});
DefaultDark.args = {};
DefaultDark.decorators = [ThemeDecorator(Theme.DARK)];

export const WithoutButtonDark = Template.bind({});
WithoutButtonDark.args = {
  onRepeat: undefined,
};
WithoutButtonDark.decorators = [ThemeDecorator(Theme.DARK)];
