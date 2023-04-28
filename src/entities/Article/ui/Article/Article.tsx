import { PropsWithChildren, memo } from 'react';
import { getClassNames } from 'shared/utils/classNames';
import { Text } from 'shared/ui/Text';
import { Icon } from 'shared/ui/Icon';
import { Card } from 'shared/ui/Card';
import EyeIcon from 'shared/assets/icons/eye.svg';
import { Article as ArticleType, ArticlesView } from '../../model/types/articleSchema';
import style from './Article.module.scss';

type ArticleProps = PropsWithChildren<{
  className?: string;
  data: ArticleType;
  view: ArticlesView;
}>;

export const Article = memo((props: ArticleProps) => {
  const { className, data, view } = props;
  const { img, title, createdAt, type, views } = data;

  if (view === 'tiles') {
    return (
      <Card className={getClassNames(style.tilesItem, {}, [className])}>
        <div className={style.imgWrapper}>
          <img src={img} alt={title} />
          <Text className={style.date} text={createdAt} />
        </div>
        <div className={style.infoWrapper}>
          <Text className={style.types} text={type.join(', ')} />
          <div className={style.views}>
            {String(views)}
            <Icon Svg={EyeIcon} />
          </div>
        </div>
        <Text className={style.title} text={title} />
      </Card>
    );
  }

  return (
    <div className={getClassNames(style.listItem, {}, [className])}>
      $0
    </div>
  );
});
