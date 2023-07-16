import { memo, PropsWithChildren } from 'react';
import { SelectOption } from '6_shared/ui/Select';
import { ListBox } from '6_shared/ui/ListBox';
import { getClassNames } from '6_shared/utils/classNames';
import { Currency } from '../../model/types/currency';

const currencies: SelectOption<Currency>[] = Object.values(Currency)
  .map((currency) => ({
    value: currency,
    content: currency,
  }));

type CurrencySelectProps = PropsWithChildren<{
  className?: string;
  value?: Currency;
  // eslint-disable-next-line no-unused-vars
  onChange: (value: Currency) => void;
}>;

export const CurrencySelect = memo((props: CurrencySelectProps) => {
  const { className, value, onChange } = props;

  const changeHandler = (value: string) => {
    onChange(value as Currency);
  };

  return (
    <ListBox
      className={getClassNames('', {}, [className])}
      items={currencies}
      selected={value ?? currencies[0].value}
      onChange={changeHandler}
    />
  );
});
