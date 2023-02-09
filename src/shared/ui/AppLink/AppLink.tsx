import { FC } from 'react';
import { Link, LinkProps } from 'react-router-dom';
import { getClassNames } from 'shared/utils/classNames';
import style from './AppLink.module.scss';

export enum AppLinkTheme {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
}

interface AppLinkProps extends LinkProps {
  className?: string;
  theme?: AppLinkTheme;
}

export const AppLink: FC<AppLinkProps> = (props) => {
  const {
    className,
    children,
    to,
    theme = AppLinkTheme.PRIMARY,
    ...otherProps
  } = props;

  return (
    <Link
      {...otherProps}
      className={getClassNames(style.appLink, {}, [className, style[theme]])}
      to={to}
    >
      {children}
    </Link>
  );
};
