import { EntityState } from '@reduxjs/toolkit';
import { mockUser } from '5_entities/User';
import { ArticleComment } from './types/articleCommentsSchema';

const mockArticleComment = ({ id = '1' } = {}): ArticleComment => (
  {
    id,
    text: `Текст комментария ${id}`,
    articleId: '1',
    userId: '1',
    user: mockUser('https://pic.rutubelist.ru/user/3b/27/3b2758ad5492a76b578f7ee072e4e894.jpg'),
  }
);

export const mockArticleComments = (count: number) => {
  const commentsList = [];

  for (let i = 1; i <= count; i += 1) {
    commentsList.push(mockArticleComment({ id: String(i) }));
  }

  return commentsList;
};

export const mockNormalizedArticleComments = (count: number) => {
  const commentsList: EntityState<ArticleComment> = {
    ids: [],
    entities: {},
  };

  let id: string;

  for (let i = 1; i <= count; i += 1) {
    id = String(i);
    commentsList.ids.push(id);
    commentsList.entities[id] = mockArticleComment({ id });
  }

  return commentsList;
};
