import { memo, PropsWithChildren } from 'react';
import { Select, SelectOption } from 'shared/ui/Select';
import { getClassNames } from 'shared/utils/classNames';
import { Country } from '../../model/types/country';

const countries: SelectOption[] = (Object.values(Country)
  .map((country) => ({
    value: country,
    content: country,
  })));

type CountrySelectProps = PropsWithChildren<{
  className?: string;
  value?: Country;
  onChange?: (value: Country) => void;
}>;

export const CountrySelect = memo((props: CountrySelectProps) => {
  const { className, value, onChange } = props;

  const changeHandler = (value: string) => {
    onChange?.(value as Country);
  };

  return (
    <Select
      className={getClassNames('', {}, [className])}
      value={value}
      options={countries}
      onChange={changeHandler}
    />
  );
});
