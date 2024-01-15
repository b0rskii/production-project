import { memo, ReactNode } from 'react';
import { getClassNames } from '6_shared/utils/classNames';
import { useModal } from '6_shared/utils/modal';
import { Portal } from '6_shared/ui/Portal';
import { Overlay } from '6_shared/ui/Overlay';
import style from './Drawer.module.scss';

const ANIMATION_MS = 300;

type DrawerProps = {
  className?: string;
  children: ReactNode;
  onClose?: () => void;
};

export const Drawer = memo((props: DrawerProps) => {
  const { className, children, onClose } = props;

  const {
    isOpening,
    isClosing,
    closeHandler,
  } = useModal({ animationMs: ANIMATION_MS, onClose });

  const modes = {
    [style.opened]: !isOpening,
    [style.closing]: isClosing,
  };

  return (
    <Portal>
      <div className={getClassNames(style.drawer, modes, [className])}>
        {!isClosing && <Overlay onClick={closeHandler} />}
        <div className={style.content}>
          {children}
        </div>
      </div>
    </Portal>
  );
});
