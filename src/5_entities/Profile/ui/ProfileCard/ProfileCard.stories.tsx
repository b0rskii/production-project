import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ThemeDecorator } from '6_shared/config/storybook/ThemeDecorator';
import { Theme } from '6_shared/utils/theme';
import { mockProfile } from '../../model/mocks';
import { ProfileCard } from './ProfileCard';

export default {
  title: '5_entities/ProfileCard',
  component: ProfileCard,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: {
    handlers: {
      onAgeChange: () => {},
      onCountryChange: () => {},
      onCurrencyChange: () => {},
      onInputChange: () => {},
    },
  },
} as ComponentMeta<typeof ProfileCard>;

const Template: ComponentStory<typeof ProfileCard> = (args) => <ProfileCard {...args} />;

export const Default = Template.bind({});
Default.args = {
  profile: mockProfile,
  isReadonly: true,
};

export const Loading = Template.bind({});
Loading.args = {
  isLoading: true,
};

export const Error = Template.bind({});
Error.args = {
  error: 'error',
};

export const Empty = Template.bind({});
Empty.args = {
  profile: null,
};

export const DefaultDark = Template.bind({});
DefaultDark.args = {
  profile: mockProfile,
  isReadonly: true,
};
DefaultDark.decorators = [ThemeDecorator(Theme.DARK)];

export const LoadingDark = Template.bind({});
LoadingDark.args = {
  isLoading: true,
};
LoadingDark.decorators = [ThemeDecorator(Theme.DARK)];

export const ErrorDark = Template.bind({});
ErrorDark.args = {
  error: 'error',
};
ErrorDark.decorators = [ThemeDecorator(Theme.DARK)];

export const EmptyDark = Template.bind({});
EmptyDark.args = {
  profile: null,
};
EmptyDark.decorators = [ThemeDecorator(Theme.DARK)];
