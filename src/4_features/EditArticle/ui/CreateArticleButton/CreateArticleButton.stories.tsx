import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ThemeDecorator } from '6_shared/config/storybook/ThemeDecorator';
import { Theme } from '6_shared/utils/theme';
import { CreateArticleButton } from './CreateArticleButton';

export default {
  title: '4_features/EditArticle/CreateArticleButton',
  component: CreateArticleButton,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof CreateArticleButton>;

const Template: ComponentStory<typeof CreateArticleButton> = (args) => <CreateArticleButton {...args} />;

export const Default = Template.bind({});
Default.args = {};

export const DefaultDark = Template.bind({});
DefaultDark.args = {};
DefaultDark.decorators = [ThemeDecorator(Theme.DARK)];
