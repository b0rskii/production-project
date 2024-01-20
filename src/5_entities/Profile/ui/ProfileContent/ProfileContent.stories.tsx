import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ThemeDecorator } from '@/6_shared/config/storybook/ThemeDecorator';
import { Theme } from '@/6_shared/utils/theme';
import { Input } from '@/6_shared/ui/Input';
import { mockProfile } from '../../model/mocks';
import { ProfileContent } from './ProfileContent';

const profile = mockProfile;

export default {
  title: '5_entities/Profile/ProfileContent',
  component: ProfileContent,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof ProfileContent>;

const Template: ComponentStory<typeof ProfileContent> = (args) => <ProfileContent {...args} />;

export const Default = Template.bind({});
Default.args = {
  avatar: profile.avatar,
  Firstname: profile.firstname,
  Lastname: profile.lastname,
  Username: profile.username,
  Age: String(profile.age),
  City: profile.city,
  Country: profile.country,
  Currency: profile.currency,
};

export const WithInputs = Template.bind({});
WithInputs.args = {
  avatar: profile.avatar,
  Firstname: <Input />,
  Lastname: <Input />,
  Username: <Input />,
  Age: <Input />,
  City: <Input />,
  Country: <Input />,
  Currency: <Input />,
  AvatarNode: <Input />,
};

export const DefaultDark = Template.bind({});
DefaultDark.args = {
  avatar: profile.avatar,
  Firstname: profile.firstname,
  Lastname: profile.lastname,
  Username: profile.username,
  Age: String(profile.age),
  City: profile.city,
  Country: profile.country,
  Currency: profile.currency,
};
DefaultDark.decorators = [ThemeDecorator(Theme.DARK)];

export const WithInputsDark = Template.bind({});
WithInputsDark.args = {
  avatar: profile.avatar,
  Firstname: <Input />,
  Lastname: <Input />,
  Username: <Input />,
  Age: <Input />,
  City: <Input />,
  Country: <Input />,
  Currency: <Input />,
  AvatarNode: <Input />,
};
WithInputsDark.decorators = [ThemeDecorator(Theme.DARK)];
