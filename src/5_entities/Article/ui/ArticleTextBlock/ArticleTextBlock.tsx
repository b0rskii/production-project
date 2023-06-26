import { PropsWithChildren, memo } from 'react';
import { getClassNames } from '6_shared/utils/classNames';
import { Text } from '6_shared/ui/Text';
import { ArticleTextBlock as IArticleTextBlock } from '../../model/types/articleSchema';
import style from './ArticleTextBlock.module.scss';

type ArticleTextBlockProps = PropsWithChildren<{
  className?: string;
  content: IArticleTextBlock;
}>;

export const ArticleTextBlock = memo((props: ArticleTextBlockProps) => {
  const { className, content } = props;

  return (
    <div className={getClassNames('', {}, [className])}>
      {content.title && <Text className={style.title} title={content.title} />}
      {content.paragraphs.map((paragraph) => (
        <Text
          className={style.paragraph}
          text={paragraph}
          key={paragraph}
        />
      ))}
    </div>
  );
});
