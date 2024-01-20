import { ComponentStory, ComponentMeta } from '@storybook/react';
import { mockProfile } from '@/5_entities/Profile';
import { mockUser } from '@/5_entities/User';
import { StoreDecorator } from '@/6_shared/config/storybook/StoreDecorator';
import { ThemeDecorator } from '@/6_shared/config/storybook/ThemeDecorator';
import { Theme } from '@/6_shared/utils/theme';
import ProfilePage from './ProfilePage';

export default {
  title: '2_pages/ProfilePage',
  component: ProfilePage,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  decorators: [
    StoreDecorator({
      profile: {
        profile: mockProfile,
      },
      user: {
        authData: mockUser(),
      },
    }),
  ],
} as ComponentMeta<typeof ProfilePage>;

const Template: ComponentStory<typeof ProfilePage> = () => <ProfilePage />;

export const Default = Template.bind({});
Default.args = {};

export const DefaultDark = Template.bind({});
DefaultDark.args = {};
DefaultDark.decorators = [ThemeDecorator(Theme.DARK)];
