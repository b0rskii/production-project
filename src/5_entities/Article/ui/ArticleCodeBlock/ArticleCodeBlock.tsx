import { PropsWithChildren, memo } from 'react';
import { getClassNames } from '@/6_shared/utils/classNames';
import { Code } from '@/6_shared/ui/Code';
import { ArticleCodeBlock as IArticleCodeBlock } from '../../model/types/articleSchema';

type ArticleCodeBlockProps = PropsWithChildren<{
  className?: string;
  content: IArticleCodeBlock;
}>;

export const ArticleCodeBlock = memo((props: ArticleCodeBlockProps) => {
  const { className, content } = props;

  return (
    <div className={getClassNames('', {}, [className])}>
      <Code code={content.code} />
    </div>
  );
});
