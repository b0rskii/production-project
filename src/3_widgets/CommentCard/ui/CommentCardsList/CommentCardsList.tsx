import { PropsWithChildren, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { getClassNames } from '@/6_shared/utils/classNames';
import { Text } from '@/6_shared/ui/Text';
import { Loader } from '@/6_shared/ui/Loader';
import { FetchError } from '@/6_shared/ui/FetchError';
import { Comment } from '@/6_shared/types/comment';
import { Stack } from '@/6_shared/ui/Stack';
import { CommentCard } from '../CommentCard';
import style from './CommentCardsList.module.scss';

type CommentCardsListProps = PropsWithChildren<{
  className?: string;
  comments: Comment[];
  isLoading: boolean;
  error: string | null;
  onRepeatFetch?: () => void;
}>;

export const CommentCardsList = memo((props: CommentCardsListProps) => {
  const { className, comments, isLoading, error, onRepeatFetch } = props;
  const { t } = useTranslation();

  return (
    <Stack
      className={getClassNames('', {}, [className])}
      justify="center"
      mode="v"
      maxWidth
    >
      {isLoading && <Loader />}

      {!isLoading && error && (
        <FetchError
          message={t('При загрузке комментариев произошла ошибка')}
          onRepeat={onRepeatFetch}
        />
      )}

      {!isLoading && !error && (
        comments.length
          ? comments.map((comment) => (
            <CommentCard
              className={style.comment}
              comment={comment}
              key={comment.id}
            />
          ))
          : <Text title={t('Комментариев нет')} TitleTag="p" />
      )}
    </Stack>
  );
});
