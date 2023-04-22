import { PropsWithChildren, memo } from 'react';
import { getClassNames } from 'shared/utils/classNames';
import { Avatar } from 'shared/ui/Avatar';
import { Text } from 'shared/ui/Text';
import { Comment } from 'shared/types/comment';
import style from './CommentCard.module.scss';

type CommentCardProps = PropsWithChildren<{
  className?: string;
  comment: Comment;
}>;

export const CommentCard = memo((props: CommentCardProps) => {
  const { className, comment } = props;
  const { user, text } = comment;

  return (
    <div className={getClassNames(style.commentCard, {}, [className])}>
      <div className={style.header}>
        {user.avatar && (
          <Avatar src={user.avatar} alt={user.name} size={30} />
        )}
        <Text title={user.name} />
      </div>
      <Text text={text} />
    </div>
  );
});
