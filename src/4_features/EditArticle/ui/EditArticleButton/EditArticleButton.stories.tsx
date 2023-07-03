import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ThemeDecorator } from '6_shared/config/storybook/ThemeDecorator';
import { Theme } from '6_shared/utils/theme';
import { EditArticleButton } from './EditArticleButton';

export default {
  title: '4_features/EditArticle/EditArticleButton',
  component: EditArticleButton,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof EditArticleButton>;

// eslint-disable-next-line react/jsx-props-no-spreading
const Template: ComponentStory<typeof EditArticleButton> = (args) => <EditArticleButton {...args} />;

export const Default = Template.bind({});
Default.args = {};

export const DefaultDark = Template.bind({});
DefaultDark.args = {};
DefaultDark.decorators = [ThemeDecorator(Theme.DARK)];
