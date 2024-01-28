import { memo, ReactNode, useEffect } from 'react';
import { getClassNames } from '@/6_shared/utils/classNames';
import { AnimationSwipeProvider, useAnimationSwipeContext } from '@/6_shared/utils/animationSwipe';
import { Portal } from '@/6_shared/ui/Portal';
import { Overlay } from '@/6_shared/ui/Overlay';
import style from './Drawer.module.scss';

const height = window.innerHeight - 100;

type DrawerProps = {
  className?: string;
  // eslint-disable-next-line no-unused-vars
  children: ReactNode | ((closeDrawer: () => void) => ReactNode);
  onClose?: () => void;
};

const DrawerContent = (props: DrawerProps) => {
  const { className, children, onClose } = props;
  const { Spring, Gesture } = useAnimationSwipeContext();

  const { useSpring, config, a } = Spring;
  const { useDrag } = Gesture;

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
          {...bind()}
        >
          {typeof children === 'function' ? children(close) : children}
        </a.div>
      </div>
    </Portal>
  );
};

const DrawerLoaded = (props: DrawerProps) => {
  const { isLoaded } = useAnimationSwipeContext();

  if (!isLoaded) {
    return null;
  }

  return <DrawerContent {...props} />;
};

export const Drawer = memo((props: DrawerProps) => (
  <AnimationSwipeProvider>
    <DrawerLoaded {...props} />
  </AnimationSwipeProvider>
));
