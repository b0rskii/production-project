import { memo, PropsWithChildren } from 'react';
import { Select, SelectOption } from '6_shared/ui/Select';
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
  onChange?: (value: Currency) => void;
}>;

export const CurrencySelect = memo((props: CurrencySelectProps) => {
  const { className, value, onChange } = props;

  return (
    <Select
      className={getClassNames('', {}, [className])}
      value={value}
      options={currencies}
      onChange={onChange}
    />
  );
});
