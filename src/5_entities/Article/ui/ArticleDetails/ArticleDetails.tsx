import { PropsWithChildren, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { getClassNames } from '6_shared/utils/classNames';
import { Text, TextTheme } from '6_shared/ui/Text';
import { Skeleton } from '6_shared/ui/Skeleton';
import { Avatar } from '6_shared/ui/Avatar';
import { I18nNameSpace } from '6_shared/utils/i18n/nameSpace';
import { Icon } from '6_shared/ui/Icon';
import EyeIcon from '6_shared/assets/icons/eye.svg';
import CalendarIcon from '6_shared/assets/icons/calendar.svg';
import { Article, ArticleBlockType } from '../../model/types/articleSchema';
import { ArticleTextBlock } from '../ArticleTextBlock';
import { ArticleCodeBlock } from '../ArticleCodeBlock';
import { ArticleImageBlock } from '../ArticleImageBlock';
import style from './ArticleDetails.module.scss';

type ArticleDetailsProps = PropsWithChildren<{
  article: Article | null;
  isLoading: boolean;
  error: string | null;
  className?: string;
}>;

export const ArticleDetails = memo((props: ArticleDetailsProps) => {
  const { article, isLoading, error, className } = props;
  const { t } = useTranslation([I18nNameSpace.Translation, I18nNameSpace.Article]);

  if (isLoading) {
    return (
      <div className={getClassNames('', {}, [className])}>
        <Skeleton className={style.avatar} width={200} height={200} borderRadius="50%" />
        <Skeleton className={style.title} width={300} height={32} />
        <Skeleton className={style.skeleton} width={600} height={24} />
        <Skeleton className={style.skeleton} width="100%" height={200} />
        <Skeleton className={style.skeleton} width="100%" height={200} />
      </div>
    );
  }

  if (error) {
    return (
      <div className={getClassNames('', {}, [className, style.error])}>
        <Text
          title={t('При загрузке статьи произошла ошибка', { ns: I18nNameSpace.Article })}
          text={t('Попробуйте обновить страницу')}
          theme={TextTheme.ERROR}
          align="center"
        />
      </div>
    );
  }

  if (!article) {
    return null;
  }

  const { img, title, subtitle, views, createdAt, blocks } = article;

  return (
    <div className={getClassNames('', {}, [className])}>
      <div className={style.avatarWrapper}>
        <Avatar
          src={img}
          size={200}
          alt={title}
        />
      </div>

      <Text
        className={style.title}
        title={title}
        text={subtitle}
        size="l"
      />

      <div className={style.info}>
        <Icon Svg={EyeIcon} />
        {views}
      </div>
      <div className={style.info}>
        <Icon Svg={CalendarIcon} />
        {createdAt}
      </div>

      {blocks.map((block) => {
        switch (block.type) {
        case ArticleBlockType.TEXT:
          return <ArticleTextBlock className={style.block} content={block} key={block.id} />;
        case ArticleBlockType.CODE:
          return <ArticleCodeBlock className={style.block} content={block} key={block.id} />;
        case ArticleBlockType.IMAGE:
          return <ArticleImageBlock className={style.block} content={block} key={block.id} />;
        default:
          return null;
        }
      })}
    </div>
  );
});
