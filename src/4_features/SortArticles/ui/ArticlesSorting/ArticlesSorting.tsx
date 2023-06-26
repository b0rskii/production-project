/* eslint-disable no-unused-vars */
import { PropsWithChildren, memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { getClassNames } from '6_shared/utils/classNames';
import { Select, SelectOption } from '6_shared/ui/Select';
import { Card } from '6_shared/ui/Card';
import { SortingType, SortingOrder } from '../../model/const';
import { TSortingType, TSortingOrder } from '../../model/types/sortArticlesSchema';
import style from './ArticlesSorting.module.scss';

const SortingTypes: SelectOption<TSortingType>[] = [
  { value: SortingType.DATE, content: 'Дате создания' },
  { value: SortingType.TITLE, content: 'Названию' },
  { value: SortingType.VIEWS, content: 'Количеству просмотров' },
];

const SortingOrders: SelectOption<TSortingOrder>[] = [
  { value: SortingOrder.ASC, content: 'Возрастанию' },
  { value: SortingOrder.DESC, content: 'Убыванию' },
];

type Props = PropsWithChildren<{
  className?: string;
  type: TSortingType;
  order: TSortingOrder;
  onTypeChange: (type: TSortingType) => void;
  onOrderChange: (order: TSortingOrder) => void;
}>;

export const ArticlesSorting = memo((props: Props) => {
  const { t } = useTranslation();
  const { className, type, order, onTypeChange, onOrderChange } = props;

  const SortingTypes = useMemo(() => [
    { value: SortingType.DATE, content: t('дате создания') },
    { value: SortingType.TITLE, content: t('названию') },
    { value: SortingType.VIEWS, content: t('количеству просмотров') },
  ], [t]);

  const SortingOrders = useMemo(() => [
    { value: SortingOrder.ASC, content: t('возрастанию') },
    { value: SortingOrder.DESC, content: t('убыванию') },
  ], [t]);

  return (
    <Card className={getClassNames(style.el, {}, [className])}>
      <Select
        className={style.select}
        options={SortingTypes}
        value={type}
        label={t('Сортировать по')}
        onChange={onTypeChange}
      />
      <Select
        className={style.select}
        options={SortingOrders}
        value={order}
        label={t('По')}
        onChange={onOrderChange}
      />
    </Card>
  );
});
