import { ComponentStory, ComponentMeta } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { StoreDecorator } from '6_shared/config/storybook/StoreDecorator';
import { ThemeDecorator } from '6_shared/config/storybook/ThemeDecorator';
import { Theme } from '6_shared/utils/theme';
import { AddCommentForm } from './AddCommentForm';

export default {
  title: '4_features/AddComment/AddCommentForm',
  component: AddCommentForm,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: {
    onSendComment: action('sendComment'),
  },
} as ComponentMeta<typeof AddCommentForm>;

const Template: ComponentStory<typeof AddCommentForm> = (args) => <AddCommentForm {...args} />;

export const Default = Template.bind({});
Default.args = {};
Default.decorators = [
  StoreDecorator({
    addComment: {
      text: 'comment text',
      isLoading: false,
      error: null,
    },
  }),
];

export const Loading = Template.bind({});
Loading.args = {};
Loading.decorators = [
  StoreDecorator({
    addComment: {
      text: 'comment text',
      isLoading: true,
      error: null,
    },
  }),
];

export const DefaultDark = Template.bind({});
DefaultDark.args = {};
DefaultDark.decorators = [
  StoreDecorator({
    addComment: {
      text: 'comment text',
      isLoading: false,
      error: null,
    },
  }),
  ThemeDecorator(Theme.DARK),
];

export const LoadingDark = Template.bind({});
LoadingDark.args = {};
LoadingDark.decorators = [
  StoreDecorator({
    addComment: {
      text: 'comment text',
      isLoading: true,
      error: null,
    },
  }),
  ThemeDecorator(Theme.DARK),
];
