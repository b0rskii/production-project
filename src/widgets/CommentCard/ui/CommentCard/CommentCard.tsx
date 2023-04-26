import { PropsWithChildren, memo } from 'react';
import { getClassNames } from 'shared/utils/classNames';
import { Avatar } from 'shared/ui/Avatar';
import { Text } from 'shared/ui/Text';
import { AppLink } from 'shared/ui/AppLink';
import { Comment } from 'shared/types/comment';
import { RoutePath } from 'shared/config/routing';
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
      <AppLink className={style.header} to={`${RoutePath.PROFILES}${user.id}`}>
        {user.avatar && (
          <Avatar src={user.avatar} alt={user.username} size={30} />
        )}
        <Text title={user.username} />
      </AppLink>
      <Text text={text} />
    </div>
  );
});
