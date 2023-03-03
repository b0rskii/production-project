import { memo } from 'react';
import { Link, LinkProps } from 'react-router-dom';
import { getClassNames } from 'shared/utils/classNames';
import style from './AppLink.module.scss';

export enum AppLinkTheme {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  PRIMARY_INVERTED = 'primaryInverted',
  SECONDARY_INVERTED = 'secondaryInverted',
}

interface AppLinkProps extends LinkProps {
  className?: string;
  theme?: AppLinkTheme;
}

export const AppLink = memo((props: AppLinkProps) => {
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
});
