import { memo, ReactNode, useEffect } from 'react';
import { useDrag } from '@use-gesture/react';
import { a, useSpring, config } from '@react-spring/web';
import { getClassNames } from '6_shared/utils/classNames';
import { Portal } from '6_shared/ui/Portal';
import { Overlay } from '6_shared/ui/Overlay';
import style from './Drawer.module.scss';

const height = window.innerHeight - 100;

type DrawerProps = {
  className?: string;
  children: ReactNode;
  onClose?: () => void;
};

export const Drawer = memo((props: DrawerProps) => {
  const { className, children, onClose } = props;

  const [{ y }, api] = useSpring(() => ({ y: height }));

  const open = ({ canceled }: { canceled?: boolean } = {}) => {
    api.start({ y: 0, immediate: false, config: canceled ? config.wobbly : config.stiff });
  };

  const close = (velocity = 0) => {
    api.start({
      y: height,
      immediate: false,
      config: { ...config.stiff, velocity },
      onResolve: onClose,
    });
  };

  const bind = useDrag(
    ({ last, velocity: [, vy], direction: [, dy], movement: [, my], cancel, canceled }) => {
      if (my < -70) cancel();

      if (last) {
        if (my > height * 0.5 || (vy > 0.5 && dy > 0)) {
          close(vy);
        } else {
          open({ canceled });
        }
      } else {
        api.start({ y: my, immediate: true });
      }
    },
    {
      from: () => [0, y.get()], filterTaps: true, bounds: { top: 0 }, rubberband: true,
    },
  );

  useEffect(() => {
    open();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const display = y.to((py) => (py < height ? 'block' : 'none'));

  return (
    <Portal>
      <div className={getClassNames(style.drawer, {}, [className])}>
        <Overlay onClick={() => close()} />
        <a.div
          className={style.sheet}
          style={{ display, bottom: `calc(-100vh + ${height - 100}px)`, y }}
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...bind()}
        >
          {children}
        </a.div>
      </div>
    </Portal>
  );
});
