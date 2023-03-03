import { VFC, SVGProps } from 'react';
import { RoutePath } from 'shared/config/routing';
import MainIcon from 'shared/assets/icons/main.svg';
import AboutIcon from 'shared/assets/icons/about.svg';
import ProfileIcon from 'shared/assets/icons/profile.svg';

export type LinkItem = {
  route: string;
  Icon: VFC<SVGProps<SVGSVGElement>>;
  translationKey: string,
};

export const linkItems: LinkItem[] = [
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
    route: RoutePath.PROFILE,
    Icon: ProfileIcon,
    translationKey: 'На страницу профиля',
  },
];
