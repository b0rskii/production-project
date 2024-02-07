import { PropsWithChildren, memo, useState } from 'react';
import { getClassNames } from '@/6_shared/utils/classNames';
import { DesktopView, MobileView, useIsMobile } from '@/6_shared/utils/deviceDetection';
import { Popover } from '@/6_shared/ui/Popups';
import { Button, ButtonTheme } from '@/6_shared/ui/Button';
import { Icon } from '@/6_shared/ui/Icon';
import BellIcon from '@/6_shared/assets/icons/bell.svg?react';
import { Drawer } from '@/6_shared/ui/Drawer';
import { useGetNotifications } from '../../api/notificationsApi';
import { NotificationsList } from '../NotificationsList';
import style from './NotificationsButton.module.scss';

const POLLING_INTERVAL_MS = 5000;

type Props = PropsWithChildren<{
  className?: string;
}>;

export const NotificationsButton = memo((props: Props) => {
  const { className } = props;
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const isMobile = useIsMobile();

  const { data, isLoading } = useGetNotifications(null, {
    pollingInterval: POLLING_INTERVAL_MS,
  });

  const triggerClickHandler = () => {
    if (!isMobile) {
      return;
    }
    setIsDrawerOpen(true);
  };

  const drawerOverlayClickHandler = () => {
    setIsDrawerOpen(false);
  };

  const Trigger = (
    <Button theme={ButtonTheme.CLEAR} onClick={triggerClickHandler}>
      <Icon Svg={BellIcon} inverted />
    </Button>
  );

  return (
    <>
      <DesktopView>
        <Popover
          className={getClassNames(style.notificationsButton, {}, [className])}
          trigger={Trigger}
          direction="bottom-left"
        >
          <NotificationsList
            className={style.notificationsList}
            data={data}
            isLoading={isLoading}
          />
        </Popover>
      </DesktopView>

      <MobileView>
        <>
          {Trigger}
          {isDrawerOpen && (
            <Drawer
              className={getClassNames(style.notificationsButton, {}, [className])}
              onClose={drawerOverlayClickHandler}
            >
              <NotificationsList
                className={style.notificationsList}
                data={data}
                isLoading={isLoading}
              />
            </Drawer>
          )}
        </>
      </MobileView>
    </>
  );
});
