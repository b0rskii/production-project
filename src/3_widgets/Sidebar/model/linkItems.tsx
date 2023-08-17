import { VFC, SVGProps } from 'react';
import { RoutePath } from '6_shared/config/routing';
import MainIcon from '6_shared/assets/icons/main.svg';
import AboutIcon from '6_shared/assets/icons/about.svg';
import ProfileIcon from '6_shared/assets/icons/profile.svg';
import ArticleIcon from '6_shared/assets/icons/article.svg';

export type LinkItem = {
  route: string;
  Icon: VFC<SVGProps<SVGSVGElement>>;
  translationKey: string,
  authOnly?: boolean;
};

export const getLinkItems = (userId?: string): LinkItem[] => [
  {
    route: RoutePath.MAIN,
    Icon: MainIcon,
    translationKey: 'На главную',
  },
  {
    route: RoutePath.ABOUT,
    Icon: AboutIcon,
    translationKey: 'На страницу о нас',
  },
  {
    route: RoutePath.PROFILE(userId as string),
    Icon: ProfileIcon,
    translationKey: 'На страницу профиля',
    authOnly: true,
  },
  {
    route: RoutePath.ARTICLES,
    Icon: ArticleIcon,
    translationKey: 'На страницу списка статей',
    authOnly: true,
  },
];
