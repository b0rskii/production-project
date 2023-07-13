import { Fragment, PropsWithChildren, ReactNode, memo } from 'react';
import { Listbox } from '@headlessui/react';
import { getClassNames } from '6_shared/utils/classNames';
import { Button, ButtonTheme } from '6_shared/ui/Button';
import style from './ListBox.module.scss';

export type ListBoxItem = {
  value: string;
  content: ReactNode;
  disabled?: boolean;
};

type Props = PropsWithChildren<{
  className?: string;
  items: ListBoxItem[];
  selected: string;
  // eslint-disable-next-line no-unused-vars
  onChange: (selected: string) => void
}>;

export const ListBox = memo((props: Props) => {
  const { className, items, selected, onChange } = props;

  return (
    <Listbox
      as="div"
      className={getClassNames(style.listBox, {}, [className])}
      value={selected}
      onChange={onChange}
    >
      <Listbox.Button as="div">
        <Button theme={ButtonTheme.OUTLINE}>{selected}</Button>
      </Listbox.Button>
      <Listbox.Options className={style.options}>
        {items.map(({ value, content, disabled }) => (
          <Listbox.Option
            as={Fragment}
            key={value}
            value={value}
            disabled={disabled}
          >
            {({ active }) => (
              <li className={getClassNames(style.item, { [style.active]: active }, [])}>
                {content}
              </li>
            )}
          </Listbox.Option>
        ))}
      </Listbox.Options>
    </Listbox>
  );
});
