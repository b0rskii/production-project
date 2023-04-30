import { PropsWithChildren, memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { getClassNames } from 'shared/utils/classNames';
import { RoutePath } from 'shared/config/routing';
import { Text } from 'shared/ui/Text';
import { Icon } from 'shared/ui/Icon';
import { Card } from 'shared/ui/Card';
import { Avatar } from 'shared/ui/Avatar';
import { Button, ButtonTheme } from 'shared/ui/Button';
import EyeIcon from 'shared/assets/icons/eye.svg';
import {
  ArticleBlockType, ArticleTextBlock as ArticleTextBlockType, Article as ArticleType, ArticlesView,
} from '../../model/types/articleSchema';
import { ArticleTextBlock } from '../ArticleTextBlock';
import style from './Article.module.scss';

type ArticleProps = PropsWithChildren<{
  className?: string;
  data: ArticleType;
  view: ArticlesView;
}>;

export const Article = memo((props: ArticleProps) => {
  const { className, data, view } = props;
  const { img, title, createdAt, type, views, user, blocks, id } = data;
  const { t } = useTranslation();
  const navigate = useNavigate();

  const Types = <Text className={style.types} text={type.join(' ')} />;
  const Img = <img src={img} alt={title} />;

  const Views = (
    <div className={style.views}>
      {String(views)}
      <Icon Svg={EyeIcon} />
    </div>
  );

  const articleClickHandler = useCallback(() => {
    navigate(`${RoutePath.ARTICLE_DETAILS}${id}`);
  }, [navigate, id]);

  if (view === 'tiles') {
    return (
      <Card
        className={getClassNames(style.tilesItem, {}, [className])}
        onClick={articleClickHandler}
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
      <Text className={style.title} title={title} />
      {Types}
      <div className={style.imgWrapper}>
        {Img}
      </div>
      {previewTextBlock && (
        <ArticleTextBlock className={style.previewText} content={previewTextBlock} />
      )}
      <div className={style.footer}>
        <Button onClick={articleClickHandler} theme={ButtonTheme.OUTLINE}>
          {`${t('Читать далее')}...`}
        </Button>
        {Views}
      </div>
    </Card>
  );
});
