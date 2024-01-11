import { Fragment, PropsWithChildren, ReactNode, memo } from 'react';
import { Menu } from '@headlessui/react';
import { getClassNames } from '6_shared/utils/classNames';
import { Direction } from '6_shared/types/common';
import style from './DropDown.module.scss';
import popupStyle from '../popup.module.scss';

export type DropDownItem = {
  content: ReactNode;
  disabled?: boolean;
  onClick?: () => void;
};

type Props = PropsWithChildren<{
  className?: string;
  items: DropDownItem[];
  button: ReactNode;
  direction?: Direction;
}>;

export const DropDown = memo((props: Props) => {
  const { className, items, button, direction = 'bottom-right' } = props;

  return (
    <Menu
      as="div"
      className={getClassNames(style.dropDown, {}, [popupStyle.el, className])}
    >
      <Menu.Button as="div" className={style.button}>
        {button}
      </Menu.Button>
      <Menu.Items
        className={getClassNames(style.items, {}, [popupStyle.items, popupStyle[direction]])}
      >
        {items.map(({ content, disabled, onClick }, i) => (
          <Menu.Item
            as={Fragment}
            disabled={disabled}
            // eslint-disable-next-line react/no-array-index-key
            key={i}
          >
            {({ active }) => {
              const modes = {
                [popupStyle.active]: active,
                [popupStyle.disabled]: disabled,
              };

              return (
                <button
                  className={getClassNames(style.item, modes, [popupStyle.item])}
                  type="button"
                  onClick={onClick}
                >
                  {content}
                </button>
              );
            }}
          </Menu.Item>
        ))}
      </Menu.Items>
    </Menu>
  );
});
