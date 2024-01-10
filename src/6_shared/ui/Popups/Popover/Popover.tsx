import { PropsWithChildren, ReactNode, memo } from 'react';
import { Popover as UiPopover } from '@headlessui/react';
import { getClassNames } from '6_shared/utils/classNames';
import style from './Popover.module.scss';
import popupStyle from '../popup.module.scss';

type Props = PropsWithChildren<{
  className?: string;
  trigger: ReactNode;
}>;

export const Popover = memo((props: Props) => {
  const { className, trigger } = props;

  return (
    <UiPopover className={getClassNames(style.popover, {}, [popupStyle.el, className])}>
      <UiPopover.Button>
        {trigger}
      </UiPopover.Button>

      <UiPopover.Panel className="absolute z-10">
        <div className="grid grid-cols-2">
          <a href="/analytics">Analytics</a>
          <a href="/engagement">Engagement</a>
          <a href="/security">Security</a>
          <a href="/integrations">Integrations</a>
        </div>

        <img src="/solutions.jpg" alt="" />
      </UiPopover.Panel>

    </UiPopover>
  );
});
