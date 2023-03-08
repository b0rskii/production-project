import { memo, PropsWithChildren } from 'react';
import { Select, SelectOption } from 'shared/ui/Select';
import { getClassNames } from 'shared/utils/classNames';
import { Currency } from '../../model/types/currency';

const currencies: SelectOption[] = Object.values(Currency)
  .map((currency) => ({
    value: currency,
    content: currency,
  }));

type CurrencySelectProps = PropsWithChildren<{
  className?: string;
  value?: Currency;
  onChange?: (value: Currency) => void;
}>;

export const CurrencySelect = memo((props: CurrencySelectProps) => {
  const { className, value, onChange } = props;

  const changeHandler = (value: string) => {
    onChange?.(value as Currency);
  };

  return (
    <Select
      className={getClassNames('', {}, [className])}
      value={value}
      options={currencies}
      onChange={changeHandler}
    />
  );
});
