import { ArticleComment } from './types/articleCommentsSchema';

const mockArticleComment = ({ id = '1' } = {}): ArticleComment => (
  {
    id,
    text: `Текст комментария ${id}`,
    articleId: '1',
    userId: '1',
    user: {
      id: '1',
      name: 'Вася',
      avatar: 'https://pic.rutubelist.ru/user/3b/27/3b2758ad5492a76b578f7ee072e4e894.jpg',
    },
  }
);

export const mockArticleComments = (count: number) => {
  const commentsList = [];

  for (let i = 1; i <= count; i += 1) {
    commentsList.push(mockArticleComment({ id: String(i) }));
  }

  return commentsList;
};
