import { memo, PropsWithChildren } from 'react';
import { SelectOption } from '6_shared/ui/Select';
import { ListBox } from '6_shared/ui/ListBox';
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
  onChange: (value: Country) => void;
}>;

export const CountrySelect = memo((props: CountrySelectProps) => {
  const { className, value, onChange } = props;

  const changeHandler = (value: string) => {
    onChange(value as Country);
  };

  return (
    <ListBox
      className={getClassNames('', {}, [className])}
      items={countries}
      selected={value ?? countries[0].value}
      onChange={changeHandler}
    />
  );
});
