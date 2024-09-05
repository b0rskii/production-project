/* eslint-disable no-plusplus */
/* eslint-disable i18next/no-literal-string */
import {
  ChangeEvent,
  PropsWithChildren,
  ReactNode,
  memo,
  useEffect,
} from 'react';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { getClassNames } from '@/6_shared/utils/classNames';
import { RadioGroup, RadioGroupItem } from '@/6_shared/ui/RadioGroup';
import { CheckboxGroup, CheckboxGroupItem } from '@/6_shared/ui/CheckboxGroup';
import { Checkbox } from '@/6_shared/ui/Checkbox';
import {
  CianPlacementRadio,
  DisplayCheckbox,
  ObjectGeneralForm,
  RealEstateType,
  SoldBy,
  StatusRadio,
  XmlCheckbox,
} from '../../model/types';
import style from './FormGeneral.module.scss';
import { UiField } from '@/6_shared/ui/UiField';
import { SelectOption, UiSelect } from '@/6_shared/ui/UiSelect';
import { useAppDispatch } from '@/6_shared/utils/redux';
import {
  objectFormActions,
  objectFormSelectors,
} from '../../model/slice/objectFormSlice';
import { formatCadastrial } from '@/6_shared/utils/formatCadastrial';

let ownerId = 1;

const displayCheckboxes: CheckboxGroupItem<DisplayCheckbox>[] = [
  { label: 'Опубликован', name: 'published' },
  { label: 'Главная страница', name: 'mainPage' },
];

const xmlCheckboxes: CheckboxGroupItem<XmlCheckbox>[] = [
  { label: 'Яндекс', name: 'xmlYandex' },
  { label: 'Facebook catalogue', name: 'xmlFacebook' },
  { label: 'Циан', name: 'xmlCian' },
  { label: 'Авито', name: 'xmlAvito' },
];

const cianPlacements: RadioGroupItem<CianPlacementRadio>[] = [
  { label: 'Бесплатное', value: 'free' },
  { label: 'Платное', value: 'paid' },
  { label: 'Выделение цветом', value: 'color' },
  { label: 'Премиум', value: 'premium' },
  { label: 'Топ', value: 'top' },
];

const status: RadioGroupItem<StatusRadio>[] = [
  { label: 'Без статуса', value: 'none' },
  { label: 'Продан', value: 'sold' },
  { label: 'Резерв', value: 'reserve' },
  { label: 'Снят с продажи', value: 'removed' },
  { label: 'Эксклюзив', value: 'exclusive' },
  { label: 'Строительство', value: 'building' },
];

const soldBy: SelectOption<SoldBy>[] = [
  { content: 'New Moscow House', value: 'newMoscowHouse' },
  { content: 'Другое агенство', value: 'otherAgency' },
];

const owners: SelectOption<string>[] = [
  { content: 'Роман Игнатьев', value: String(ownerId++) },
  { content: 'Роман Игнатьев2', value: String(ownerId++) },
  { content: 'Роман Игнатьев', value: String(ownerId++) },
  { content: 'Роман Игнатьев2', value: String(ownerId++) },
  { content: 'Роман Игнатьев', value: String(ownerId++) },
  { content: 'Роман Игнатьев2', value: String(ownerId++) },
  { content: 'Роман Игнатьев', value: String(ownerId++) },
  { content: 'Роман Игнатьев', value: String(ownerId++) },
  { content: 'Роман Игнатьев2', value: String(ownerId++) },
  { content: 'Роман Игнатьев', value: String(ownerId++) },
  { content: 'Роман Игнатьев2', value: String(ownerId++) },
  { content: 'Роман Игнатьев', value: String(ownerId++) },
  { content: 'Роман Игнатьев2', value: String(ownerId++) },
  { content: 'Роман Игнатьев', value: String(ownerId++) },
  { content: 'Роман Игнатьев', value: String(ownerId++) },
  { content: 'Роман Игнатьев2', value: String(ownerId++) },
  { content: 'Роман Игнатьев', value: String(ownerId++) },
  { content: 'Роман Игнатьев2', value: String(ownerId++) },
  { content: 'Роман Игнатьев', value: String(ownerId++) },
  { content: 'Роман Игнатьев2', value: String(ownerId++) },
  { content: 'Роман Игнатьев', value: String(ownerId++) },
  { content: 'Роман Игнатьев', value: String(ownerId++) },
  { content: 'Роман Игнатьев2', value: String(ownerId++) },
  { content: 'Роман Игнатьев', value: String(ownerId++) },
  { content: 'Роман Игнатьев2', value: String(ownerId++) },
  { content: 'Роман Игнатьев', value: String(ownerId++) },
  { content: 'Роман Игнатьев2', value: String(ownerId++) },
  { content: 'Роман Игнатьев', value: String(ownerId++) },
];

const realEstateTypes: RadioGroupItem<RealEstateType>[] = [
  { label: 'Дом', value: 'house' },
  { label: 'Участок', value: 'plot' },
  { label: 'Таунхаус', value: 'townhouse' },
  { label: 'Квартира', value: 'flat' },
  { label: 'Апартаменты', value: 'apartments' },
];

type Props = PropsWithChildren<{
  className?: string;
}>;

export const FormGeneral = memo(({ className }: Props) => {
  const dispatch = useAppDispatch();
  const formData = useSelector(objectFormSelectors.getGeneralData);

  const { register, watch, getValues } = useForm<ObjectGeneralForm>({
    defaultValues: formData,
  });
  const isSoldStatus = watch('status') === 'sold';

  useEffect(() => {
    return () => {
      dispatch(objectFormActions.updateGeneralFormData(getValues()));
    };
  }, [getValues, dispatch]);

  const handleCadastrialInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
    evt.target.value = formatCadastrial(evt.target.value);
  };

  return (
    <form className={getClassNames(style.formGeneral, {}, [className])}>
      <Fieldset title="СТАТУС И ВЫГРУЗКА">
        <CheckboxGroup label="Отображение">
          {displayCheckboxes.map(({ label, name, checked }) => (
            <Checkbox
              label={label}
              key={name}
              checkboxProps={{
                defaultChecked: checked,
                ...register(`display.${name}`),
              }}
            />
          ))}
        </CheckboxGroup>
        <CheckboxGroup label="Выгрузки (XML)">
          {xmlCheckboxes.map(({ label, name, checked }) => (
            <Checkbox
              label={label}
              key={name}
              checkboxProps={{
                defaultChecked: checked,
                ...register(`xml.${name}`),
              }}
            />
          ))}
        </CheckboxGroup>
        <RadioGroup
          label="Тип размещения Циан"
          data={cianPlacements}
          inputsProps={{
            ...register('cianPlacement'),
          }}
        />
        <UiField
          label="Ставка аукциона циан"
          inputProps={{
            type: 'number',
            ...register('cianAuctionBid'),
          }}
        />
        <RadioGroup
          label="Статус"
          data={status}
          inputsProps={{
            ...register('status'),
          }}
        />
        {isSoldStatus && (
          <div className={style.block}>
            <UiSelect
              label="Кем продан"
              options={soldBy}
              selectProps={{ ...register('soldBy') }}
            />
            <UiField
              label="Дата продажи"
              inputProps={{ type: 'date', ...register('soldDate') }}
            />
          </div>
        )}
      </Fieldset>

      <Fieldset title="ОБ ОБЪЕКТЕ">
        <UiSelect
          label="Собственник"
          options={owners}
          selectProps={{ ...register('soldBy') }}
        />
        <RadioGroup
          label="тип недвижимости"
          data={realEstateTypes}
          inputsProps={{ ...register('realEstateType') }}
        />
        <div className={style.block}>
          <UiField
            label="Кадастровый номер участка"
            inputProps={{
              ...register('cadastralPlotNumber'),
              onChange: handleCadastrialInputChange,
            }}
          />
          <UiField
            label="Кадастровый номер дома"
            inputProps={{
              pattern: '/[d:]/',
              ...register('cadastralHouseNumber'),
              onChange: handleCadastrialInputChange,
            }}
          />
        </div>
      </Fieldset>

      {/* <Fieldset title="НАЗВАНИЕ И ОПЕИСАНИЕ ДЛЯ САЙТА" /> */}

      {/* <Fieldset title="SEO" /> */}
    </form>
  );
});

function Fieldset({
  title,
  children,
}: {
  title: string;
  children?: ReactNode;
}) {
  return (
    <fieldset className={style.fieldset}>
      <legend>{title}</legend>
      {children}
    </fieldset>
  );
}
