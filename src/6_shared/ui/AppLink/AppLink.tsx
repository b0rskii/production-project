/* eslint-disable no-unused-vars */
import { memo } from 'react';
import { Link, LinkProps } from 'react-router-dom';
import { getClassNames } from '6_shared/utils/classNames';
import style from './AppLink.module.scss';

export enum AppLinkTheme {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  PRIMARY_INVERTED = 'primaryInverted',
  SECONDARY_INVERTED = 'secondaryInverted',
  OUTLINE = 'outline',
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
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...otherProps}
      className={getClassNames(style.appLink, {}, [className, style[theme]])}
      to={to}
    >
      {children}
    </Link>
  );
});
