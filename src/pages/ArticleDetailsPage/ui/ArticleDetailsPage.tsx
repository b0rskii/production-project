import { PropsWithChildren, memo } from 'react';
import { CommentCardsList } from 'widgets/CommentCard';
import { getClassNames } from 'shared/utils/classNames';
import { ArticleDetailsBlock } from './ArticleDetailsBlock';

type ArticleDetailsPageProps = PropsWithChildren<{
  className?: string;
}>;

const ArticleDetailsPage = (props: ArticleDetailsPageProps) => {
  const { className } = props;

  return (
    <div className={getClassNames('', {}, [className])}>
      <ArticleDetailsBlock />
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
};

export default memo(ArticleDetailsPage);
