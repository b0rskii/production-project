import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ThemeDecorator } from '@/6_shared/config/storybook/ThemeDecorator';
import { Theme } from '@/6_shared/utils/theme';
import { mockCommentsList } from '../../model/mocks';
import { CommentCardsList } from './CommentCardsList';

const comments = mockCommentsList(5);

export default {
  title: '3_widgets/CommentCard/CommentCardsList',
  component: CommentCardsList,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof CommentCardsList>;

const Template: ComponentStory<typeof CommentCardsList> = (args) => <CommentCardsList {...args} />;

export const Default = Template.bind({});
Default.args = {
  comments,
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
  comments: [],
};

export const DefaultDark = Template.bind({});
DefaultDark.args = {
  comments,
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
  comments: [],
};
EmptyDark.decorators = [ThemeDecorator(Theme.DARK)];
