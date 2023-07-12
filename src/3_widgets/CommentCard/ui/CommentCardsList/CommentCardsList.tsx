import { PropsWithChildren, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { getClassNames } from '6_shared/utils/classNames';
import { Text, TextTheme } from '6_shared/ui/Text';
import { Loader } from '6_shared/ui/Loader';
import { Comment } from '6_shared/types/comment';
import { Stack } from '6_shared/ui/Stack';
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
      <Stack className={className} justify="center">
        <Loader />
      </Stack>
    );
  }

  if (error) {
    return (
      <Stack className={className} justify="center">
        <Text
          title={t('При загрузке комментариев произошла ошибка')}
          text={t('Попробуйте обновить страницу')}
          theme={TextTheme.ERROR}
          align="center"
        />
      </Stack>
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
