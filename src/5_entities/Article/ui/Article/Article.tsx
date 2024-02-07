import { HTMLAttributeAnchorTarget, PropsWithChildren, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { getClassNames } from '@/6_shared/utils/classNames';
import { RoutePath } from '@/6_shared/config/routing';
import { Text } from '@/6_shared/ui/Text';
import { Icon } from '@/6_shared/ui/Icon';
import { Card } from '@/6_shared/ui/Card';
import { Avatar } from '@/6_shared/ui/Avatar';
import { AppLink, AppLinkTheme } from '@/6_shared/ui/AppLink';
import { ListView } from '@/6_shared/ui/ListViewSwitcher';
import EyeIcon from '@/6_shared/assets/icons/eye.svg?react';
import {
  ArticleTextBlock as ArticleTextBlockType,
  Article as ArticleType,
} from '../../model/types/articleSchema';
import { ArticleBlockType } from '../../model/const';
import { ArticleTextBlock } from '../ArticleTextBlock';
import style from './Article.module.scss';

type ArticleProps = PropsWithChildren<{
  className?: string;
  data: ArticleType;
  view: ListView;
  target?: HTMLAttributeAnchorTarget;
}>;

export const Article = memo((props: ArticleProps) => {
  const { className, data, view, target } = props;
  const { img, title, createdAt, type, views, user, blocks, id } = data;
  const { t } = useTranslation();

  const Types = <Text className={style.types} text={type.join(' ')} />;
  const Img = <img src={img} alt={title} />;

  const Views = (
    <div className={style.views}>
      {String(views)}
      <Icon Svg={EyeIcon} />
    </div>
  );

  if (view === 'tiles') {
    return (
      <AppLink
        className={style.tileCardWrapper}
        to={RoutePath.ARTICLE_DETAILS(id)}
        target={target}
      >
        <Card
          className={getClassNames(style.tilesItem, {}, [className])}
        >
          <div className={style.imgWrapper}>
            {Img}
            <Text className={style.date} text={createdAt} />
          </div>
          <div className={style.infoWrapper}>
            {Types}
            {Views}
          </div>
          <Text className={style.title} text={title} />
        </Card>
      </AppLink>
    );
  }

  const previewTextBlock = blocks.find(
    (block) => block.type === ArticleBlockType.TEXT,
  ) as ArticleTextBlockType | undefined;

  return (
    <Card className={getClassNames(style.listItem, {}, [className])}>
      <div className={style.header}>
        <Avatar className={style.avatar} src={user.avatar} alt={user.username} size={30} />
        <Text text={user.username} />
        <Text className={style.date} text={createdAt} />
      </div>
      <Text className={style.title} title={title} TitleTag="h3" />
      {Types}
      <div className={style.imgWrapper}>
        {Img}
      </div>
      {previewTextBlock && (
        <ArticleTextBlock className={style.previewText} content={previewTextBlock} />
      )}
      <div className={style.footer}>
        <AppLink to={RoutePath.ARTICLE_DETAILS(id)} theme={AppLinkTheme.OUTLINE}>
          {`${t('Читать далее')}...`}
        </AppLink>
        {Views}
      </div>
    </Card>
  );
});
