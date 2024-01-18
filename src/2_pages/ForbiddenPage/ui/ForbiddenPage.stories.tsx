import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ThemeDecorator } from '6_shared/config/storybook/ThemeDecorator';
import { StoreDecorator } from '6_shared/config/storybook/StoreDecorator';
import { Theme } from '6_shared/utils/theme';
import ForbiddenPage from './ForbiddenPage';

export default {
  title: '2_pages/ForbiddenPage',
  component: ForbiddenPage,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  decorators: [
    StoreDecorator({}),
  ],
} as ComponentMeta<typeof ForbiddenPage>;

const Template: ComponentStory<typeof ForbiddenPage> = (args: {}) => <ForbiddenPage {...args} />;

export const Default = Template.bind({});
Default.args = {};

export const DefaultDark = Template.bind({});
DefaultDark.args = {};
DefaultDark.decorators = [ThemeDecorator(Theme.DARK)];
