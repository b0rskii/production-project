import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator';
import { Theme } from 'shared/utils/theme';
import { mockComment } from '../../model/mocks';
import { CommentCard } from './CommentCard';

const commentWithAvatar = mockComment();
const commentWithoutAvatar = mockComment({ isAvatar: false });

export default {
  title: 'widgets/CommentCard/CommentCard',
  component: CommentCard,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof CommentCard>;

const Template: ComponentStory<typeof CommentCard> = (args) => <CommentCard {...args} />;

export const Default = Template.bind({});
Default.args = {
  comment: commentWithAvatar,
};

export const WithoutAvatar = Template.bind({});
WithoutAvatar.args = {
  comment: commentWithoutAvatar,
};

export const DefaultDark = Template.bind({});
DefaultDark.args = {
  comment: commentWithAvatar,
};
DefaultDark.decorators = [ThemeDecorator(Theme.DARK)];

export const WithoutAvatarDark = Template.bind({});
WithoutAvatarDark.args = {
  comment: commentWithoutAvatar,
};
WithoutAvatarDark.decorators = [ThemeDecorator(Theme.DARK)];
