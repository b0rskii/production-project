import { memo, PropsWithChildren, useState } from 'react';
import { SelectOption } from '@/6_shared/ui/Select';
import { ListBox } from '@/6_shared/ui/Popups';
import { getClassNames } from '@/6_shared/utils/classNames';
import { Country } from '../../model/types/country';

const countries: SelectOption<Country>[] = Object.values(Country)
  .map((country) => ({
    value: country,
    content: country,
  }));

type CountrySelectProps = PropsWithChildren<{
  className?: string;
  initialValue?: Country;
  disabled?: boolean;
  // eslint-disable-next-line no-unused-vars
  onChange?: (value: Country) => void;
}>;

export const CountrySelect = memo((props: CountrySelectProps) => {
  const { className, initialValue, disabled, onChange } = props;
  const [selected, setSelected] = useState(initialValue ?? countries[0].value);

  const changeHandler = (value: string) => {
    setSelected(value as Country);
    onChange?.(value as Country);
  };

  return (
    <ListBox
      className={getClassNames('', {}, [className])}
      items={countries}
      selected={selected}
      disabled={disabled}
      onChange={changeHandler}
      data-testid="CountrySelect"
    />
  );
});
