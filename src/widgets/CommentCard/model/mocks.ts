export const mockComment = ({
  isAvatar = true,
  id = '1',
} = {}) => (
  {
    id,
    text: `Текст комментария ${id}`,
    user: {
      id: '1',
      name: 'Вася',
      avatar: (isAvatar
        ? 'https://pic.rutubelist.ru/user/3b/27/3b2758ad5492a76b578f7ee072e4e894.jpg'
        : undefined
      ),
    },
  }
);

export const mockCommentsList = (count: number) => {
  const commentsList = [];

  for (let i = 1; i <= count; i += 1) {
    commentsList.push(mockComment({ id: String(i) }));
  }

  return commentsList;
};
