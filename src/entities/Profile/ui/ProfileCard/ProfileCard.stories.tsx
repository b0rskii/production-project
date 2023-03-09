import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Country } from 'entities/Country';
import { Currency } from 'entities/Currency';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator';
import { Theme } from 'shared/utils/theme';
import { Profile } from '../../model/types/profileSchema';
import { ProfileCard } from './ProfileCard';

const PROFILE: Profile = {
  age: 30,
  avatar: 'https://pic.rutubelist.ru/user/3b/27/3b2758ad5492a76b578f7ee072e4e894.jpg',
  city: 'City-17',
  country: Country.Russia,
  currency: Currency.RUB,
  firstname: 'Гордон',
  lastname: 'Фримен',
  username: 'HALF-LIFE',
};

export default {
  title: 'entities/ProfileCard',
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
  profile: PROFILE,
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
  profile: PROFILE,
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
