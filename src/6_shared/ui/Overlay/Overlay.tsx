import { PropsWithChildren, memo } from 'react';
import { getClassNames } from '@/6_shared/utils/classNames';
import style from './Overlay.module.scss';

type Props = PropsWithChildren<{
  className?: string;
  onClick?: () => void;
}>;

export const Overlay = memo((props: Props) => {
  const { className, onClick } = props;

  return (
    <div className={getClassNames(style.overlay, {}, [className])} onClick={onClick} />
  );
});
