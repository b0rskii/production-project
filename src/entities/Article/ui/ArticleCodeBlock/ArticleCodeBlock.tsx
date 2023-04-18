import { PropsWithChildren, memo } from 'react';
import { getClassNames } from 'shared/utils/classNames';
import { Code } from 'shared/ui/Code';
import { ArticleCodeBlock as IArticleCodeBlock } from '../../model/types/articleSchema';
import style from './ArticleCodeBlock.module.scss';

type ArticleCodeBlockProps = PropsWithChildren<{
  className?: string;
  content: IArticleCodeBlock;
}>;

export const ArticleCodeBlock = memo((props: ArticleCodeBlockProps) => {
  const { className, content } = props;

  return (
    <div className={getClassNames(style.articleCodeBlock, {}, [className])}>
      <Code code={content.code} />
    </div>
  );
});
