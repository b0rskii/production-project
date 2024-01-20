import { PropsWithChildren, memo } from 'react';
import { getClassNames } from '@/6_shared/utils/classNames';
import { Text } from '@/6_shared/ui/Text';
import { ArticleImageBlock as IArticleImageBlock } from '../../model/types/articleSchema';
import style from './ArticleImageBlock.module.scss';

type ArticleImageBlockProps = PropsWithChildren<{
  className?: string;
  content: IArticleImageBlock;
}>;

export const ArticleImageBlock = memo((props: ArticleImageBlockProps) => {
  const { className, content } = props;

  return (
    <div className={getClassNames(style.articleImageBlock, {}, [className])}>
      <img src={content.src} alt={content.title} />
      {content.title && (
        <Text className={style.title} text={content.title} />
      )}
    </div>
  );
});
