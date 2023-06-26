import { FC } from 'react';
import { getClassNames } from '6_shared/utils/classNames/getClassNames';
import style from './Loader.module.scss';

type LoaderProps = {
  className?: string;
};

export const Loader: FC<LoaderProps> = (props) => {
  const { className } = props;

  return (
    <div className={getClassNames(style.loader, {}, [className])}>
      <div />
      <div />
      <div />
    </div>
  );
};
