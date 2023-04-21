import { PropsWithChildren, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { getClassNames } from 'shared/utils/classNames';
import { Text, TextTheme } from 'shared/ui/Text';
import { Loader } from 'shared/ui/Loader';
import { Comment } from '../../model/types/comment';
import { CommentCard } from '../CommentCard';
import style from './CommentCardsList.module.scss';

type CommentCardsListProps = PropsWithChildren<{
  className?: string;
  comments: Comment[];
  isLoading: boolean;
  error: string | null;
}>;

export const CommentCardsList = memo((props: CommentCardsListProps) => {
  const { className, comments, isLoading, error } = props;
  const { t } = useTranslation();

  if (isLoading) {
    return (
      <div className={getClassNames('', {}, [className, style.loading])}>
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className={getClassNames(style.profileCard, {}, [className, style.error])}>
        <Text
          title={t('При загрузке комментариев произошла ошибка')}
          text={t('Попробуйте обновить страницу')}
          theme={TextTheme.ERROR}
          align="center"
        />
      </div>
    );
  }

  return (
    <div className={getClassNames('', {}, [className])}>
      {comments.length
        ? comments.map((comment) => (
          <CommentCard
            className={style.comment}
            comment={comment}
            key={comment.id}
          />
        ))
        : <Text title={t('Комментариев нет')} />}
    </div>
  );
});
