import { PropsWithChildren, memo, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { CommentCardsList } from 'widgets/CommentCard';
import {
  ARTICLE_COMMENTS_SLICE, articleCommentsReducer, articleCommentsSelectors, fetchArticleComments,
} from 'entities/ArticleComment';
import { getClassNames } from 'shared/utils/classNames';
import { useAppDispatch, useAsyncReducer } from 'shared/utils/redux';
import style from './ArticleCommentsBlock.module.scss';

type ArticleCommentsBlockProps = PropsWithChildren<{
  className?: string;
  articleId?: string;
}>;

export const ArticleCommentsBlock = memo((props: ArticleCommentsBlockProps) => {
  const { className, articleId } = props;
  const dispatch = useAppDispatch();

  useAsyncReducer(ARTICLE_COMMENTS_SLICE, articleCommentsReducer);

  const comments = useSelector(articleCommentsSelectors.getArticleComments);
  const isLoading = useSelector(articleCommentsSelectors.getIsLoading);
  const error = useSelector(articleCommentsSelectors.getError);

  useEffect(() => {
    if (articleId && __PROJECT__ !== 'storybook') {
      dispatch(fetchArticleComments(articleId));
    }
  }, [dispatch, articleId]);

  return (
    <div className={getClassNames(style.articleCommentsBlock, {}, [className])}>
      <CommentCardsList
        isLoading
        comments={[
          {
            id: '1',
            user: {
              id: '1',
              name: 'Вася',
            },
            text: 'freghrthhrthrt',
          },
          {
            id: '2',
            user: {
              id: '2',
              name: 'Jhon',
              avatar: 'https://pic.rutubelist.ru/user/3b/27/3b2758ad5492a76b578f7ee072e4e894.jpg',
            },
            text: 'rererthjtykjtyujtyhrtgrt',
          },
        ]}
      />
    </div>
  );
});