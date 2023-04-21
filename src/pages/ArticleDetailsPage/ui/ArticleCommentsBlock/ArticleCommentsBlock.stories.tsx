import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator';
import { Theme } from 'shared/utils/theme';
import { ArticleCommentsBlock } from './ArticleCommentsBlock';

export default {
  title: 'entities/ArticleCommentsBlock',
  component: ArticleCommentsBlock,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof ArticleCommentsBlock>;

const Template: ComponentStory<typeof ArticleCommentsBlock> = (args) => <ArticleCommentsBlock {...args} />;

export const Default = Template.bind({});
Default.args = {};

export const DefaultDark = Template.bind({});
DefaultDark.args = {};
DefaultDark.decorators = [ThemeDecorator(Theme.DARK)];
