import { PropsWithChildren, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { getClassNames } from 'shared/utils/classNames';
import { Text } from 'shared/ui/Text';
import { Loader } from 'shared/ui/Loader';
import { Comment } from '../../model/types/comment';
import { CommentCard } from '../CommentCard';
import style from './CommentCardsList.module.scss';

type CommentCardsListProps = PropsWithChildren<{
  className?: string;
  comments: Comment[];
  isLoading: boolean;
}>;

export const CommentCardsList = memo((props: CommentCardsListProps) => {
  const { className, comments, isLoading } = props;
  const { t } = useTranslation();

  if (isLoading) {
    return (
      <div className={getClassNames('', {}, [className, style.loading])}>
        <Loader />
      </div>
    );
  }

  return (
    <div className={getClassNames('', {}, [className])}>
      {comments.length
        ? comments.map((comment) => (
          <CommentCard className={style.comment} comment={comment} />
        ))
        : <Text title={t('Комментариев нет')} />}
    </div>
  );
});
