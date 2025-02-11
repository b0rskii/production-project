/* eslint-disable i18next/no-literal-string */
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Page } from '@/3_widgets/Page';
import { I18nNameSpace } from '@/6_shared/utils/i18n/nameSpace';
import { NumberInput } from '@/6_shared/ui/NumberInput';

function MainPage() {
  const { t } = useTranslation(I18nNameSpace.Main);
  const [value, setValue] = useState('1.00000');

  return (
    <Page data-testid="MainPage">
      {t('Главная страница')}
      <NumberInput
        minValue={0.001}
        maxValue={0.5}
        decimalScale={3}
        value={value}
        onChange={setValue}
      />
    </Page>
  );
}

export default MainPage;
