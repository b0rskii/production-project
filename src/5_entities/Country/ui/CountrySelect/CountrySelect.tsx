import { memo, PropsWithChildren } from 'react';
import { Select, SelectOption } from '6_shared/ui/Select';
import { getClassNames } from '6_shared/utils/classNames';
import { Country } from '../../model/types/country';

const countries: SelectOption<Country>[] = Object.values(Country)
  .map((country) => ({
    value: country,
    content: country,
  }));

type CountrySelectProps = PropsWithChildren<{
  className?: string;
  value?: Country;
  // eslint-disable-next-line no-unused-vars
  onChange?: (value: Country) => void;
}>;

export const CountrySelect = memo((props: CountrySelectProps) => {
  const { className, value, onChange } = props;

  return (
    <Select
      className={getClassNames('', {}, [className])}
      value={value}
      options={countries}
      onChange={onChange}
    />
  );
});
