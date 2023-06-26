import { PropsWithChildren, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { getClassNames } from '6_shared/utils/classNames';
import { Card } from '6_shared/ui/Card';
import { Input, InputMode } from '6_shared/ui/Input';
import style from './ArticlesSearch.module.scss';

type Props = PropsWithChildren<{
  className?: string;
  search: string;
  // eslint-disable-next-line no-unused-vars
  onChange: (value: string) => void;
}>;

export const ArticlesSearch = memo((props: Props) => {
  const { className, search, onChange } = props;
  const { t } = useTranslation();

  return (
    <Card className={getClassNames(style.articlesSearch, {}, [className])}>
      <Input
        value={search}
        onChange={onChange}
        placeholder={t('Поиск')}
        mode={InputMode.OUTLINE}
      />
    </Card>
  );
});
