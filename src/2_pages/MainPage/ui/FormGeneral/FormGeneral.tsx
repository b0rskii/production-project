/* eslint-disable i18next/no-literal-string */
import { PropsWithChildren, ReactNode, memo } from 'react';
import { useForm } from 'react-hook-form';
import { getClassNames } from '@/6_shared/utils/classNames';
import { RadioGroup, RadioGroupItem } from '@/6_shared/ui/RadioGroup';
import { CheckboxGroup, CheckboxGroupItem } from '@/6_shared/ui/CheckboxGroup';
import { Button, ButtonTheme } from '@/6_shared/ui/Button';
import { Checkbox } from '@/6_shared/ui/Checkbox';
import {
  CianPlacementRadio,
  DisplayCheckbox,
  ObjectGeneralForm,
  XmlCheckbox,
} from '../../model/types';
import style from './FormGeneral.module.scss';

type Props = PropsWithChildren<{
  className?: string;
}>;

export const FormGeneral = memo((props: Props) => {
  const { className } = props;
  const { register, handleSubmit } = useForm<ObjectGeneralForm>();

  const displayCheckboxes: CheckboxGroupItem<DisplayCheckbox>[] = [
    { label: 'Опубликован', name: 'published' },
    { label: 'Главная страница', name: 'mainPage', checked: true },
  ];

  const xmlCheckboxes: CheckboxGroupItem<XmlCheckbox>[] = [
    { label: 'Яндекс', name: 'xmlYandex', checked: true },
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

  const onSubmit = (data: ObjectGeneralForm) => {
    console.log(data);
  };

  return (
    <form
      className={getClassNames(style.formGeneral, {}, [className])}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Fieldset title="СТАТУС И ВЫГРУЗКА">
        <CheckboxGroup label="Отображение">
          {displayCheckboxes.map(({ label, name, checked }) => (
            <Checkbox
              label={label}
              key={name}
              checkboxProps={{
                ...register(`display.${name}`),
                defaultChecked: checked,
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
                ...register(`xml.${name}`),
                defaultChecked: checked,
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
      </Fieldset>

      <Fieldset title="ОБ ОБЪЕКТЕ" />

      <Fieldset title="НАЗВАНИЕ И ОПЕИСАНИЕ ДЛЯ САЙТА" />

      <Fieldset title="SEO" />

      <Button theme={ButtonTheme.OUTLINE} type="submit">
        Отправить на проверку
      </Button>
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
