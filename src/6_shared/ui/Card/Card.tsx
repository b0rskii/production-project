import { HTMLAttributes, ReactNode, memo } from 'react';
import { getClassNames } from '@/6_shared/utils/classNames';
import style from './Card.module.scss';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: ReactNode;
}

export const Card = memo((props: CardProps) => {
  const { className, children, ...otherProps } = props;

  return (
    <div
      {...otherProps}
      className={getClassNames(style.card, {}, [className])}
    >
      {children}
    </div>
  );
});
