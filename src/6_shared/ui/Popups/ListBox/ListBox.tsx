import { Fragment, PropsWithChildren, ReactNode, memo } from 'react';
import { Listbox } from '@headlessui/react';
import { getClassNames } from '6_shared/utils/classNames';
import { Button, ButtonTheme } from '6_shared/ui/Button';
import style from './ListBox.module.scss';
import popupStyle from '../popup.module.scss';

export type ListBoxItem = {
  value: string;
  content: ReactNode;
  disabled?: boolean;
};

type Props = PropsWithChildren<{
  className?: string;
  items: ListBoxItem[];
  selected: string;
  disabled?: boolean;
  // eslint-disable-next-line no-unused-vars
  onChange: (selected: string) => void;
  'data-testid'?: string;
}>;

export const ListBox = memo((props: Props) => {
  const {
    className,
    items,
    selected,
    disabled,
    onChange,
    'data-testid': dataTestid = 'ListBox',
  } = props;

  return (
    <Listbox
      as="div"
      disabled={disabled}
      className={getClassNames(style.listBox, {}, [popupStyle.el, className])}
      value={selected}
      onChange={onChange}
      data-testid={dataTestid}
    >
      <Listbox.Button as="div">
        <Button
          className={style.button}
          theme={ButtonTheme.OUTLINE}
          data-testid={`${dataTestid}.Button`}
        >
          {selected}
        </Button>
      </Listbox.Button>
      <Listbox.Options className={getClassNames(style.options, {}, [popupStyle.items])}>
        {items.map(({ value, content, disabled }) => (
          <Listbox.Option
            as={Fragment}
            key={value}
            value={value}
            disabled={disabled}
          >
            {({ active }) => {
              const modes = {
                [popupStyle.active]: active,
                [popupStyle.disabled]: disabled,
              };

              return (
                <li className={getClassNames(popupStyle.item, modes, [])}>
                  {content}
                </li>
              );
            }}
          </Listbox.Option>
        ))}
      </Listbox.Options>
    </Listbox>
  );
});
