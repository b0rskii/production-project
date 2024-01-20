import { PropsWithChildren, ReactNode, memo } from 'react';
import { Popover as UiPopover } from '@headlessui/react';
import { getClassNames } from '@/6_shared/utils/classNames';
import { Direction } from '@/6_shared/types/common';
import style from './Popover.module.scss';
import popupStyle from '../popup.module.scss';

type Props = PropsWithChildren<{
  className?: string;
  trigger: ReactNode;
  direction?: Direction;
}>;

export const Popover = memo((props: Props) => {
  const { className, trigger, direction = 'bottom-right', children } = props;

  return (
    <UiPopover className={getClassNames(style.popover, {}, [popupStyle.el, className])}>
      <UiPopover.Button as="div">
        {trigger}
      </UiPopover.Button>

      <UiPopover.Panel
        className={getClassNames(style.content, {}, [popupStyle.items, popupStyle[direction]])}
      >
        {children}
      </UiPopover.Panel>
    </UiPopover>
  );
});
