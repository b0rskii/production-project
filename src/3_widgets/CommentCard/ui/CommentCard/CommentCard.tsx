import { PropsWithChildren, memo } from 'react';
import { getClassNames } from '@/6_shared/utils/classNames';
import { Avatar } from '@/6_shared/ui/Avatar';
import { Text } from '@/6_shared/ui/Text';
import { AppLink } from '@/6_shared/ui/AppLink';
import { Comment } from '@/6_shared/types/comment';
import { RoutePath } from '@/6_shared/config/routing';
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
      <AppLink className={style.header} to={RoutePath.PROFILE(user.id)}>
        {user.avatar && (
          <Avatar src={user.avatar} alt={user.username} size={30} />
        )}
        <Text title={user.username} />
      </AppLink>
      <Text text={text} />
    </div>
  );
});
