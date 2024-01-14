import { memo, ReactNode } from 'react';
import { getClassNames } from '6_shared/utils/classNames';
// import { useTheme } from 'app/providers/ThemeProvider';
import { Overlay } from '../Overlay';
import style from './Drawer.module.scss';
import { Portal } from '../Portal/Portal';

type DrawerProps = {
  className?: string;
  children: ReactNode;
  isOpen?: boolean;
  onClose?: () => void;
};

export const Drawer = memo((props: DrawerProps) => {
  const {
    className,
    children,
    onClose,
    isOpen,
  } = props;
  // const { theme } = useTheme();

  const modes = {
    [style.opened]: isOpen,
  };

  return (
    <Portal>
      <div className={getClassNames(style.drawer, modes, [className])}>
        <Overlay onClick={onClose} />
        <div
          className={style.content}
        >
          {children}
        </div>
      </div>
    </Portal>
  );
});
