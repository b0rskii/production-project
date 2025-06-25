/* eslint-disable i18next/no-literal-string */
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Page } from '@/3_widgets/Page';
import { I18nNameSpace } from '@/6_shared/utils/i18n/nameSpace';
import { Stack } from '@/6_shared/ui/Stack';
import { Button } from '@/6_shared/ui/Button';
import {
  DataBoundary,
  Data,
  DataBoundaryNotification,
} from '@/6_shared/utils/dataBoundary';

function MainPage() {
  const { t } = useTranslation(I18nNameSpace.Main);

  const [data, setData] = useState({
    name: 'Дмитрий',
    surname: 'Гладкий',
    age: null,
    name1: 'Дмитрий1',
    surname1: 'Гладкий1',
    age1: 32,
    name2: 'Дмитрий2',
    surname2: 'Гладкий2',
    age2: 32,
  });
  const [isValid, setIsValid] = useState(true);
  console.log(isValid);
  return (
    <Page data-testid="MainPage">
      {t('Главная страница')}
      <Button onClick={() => setData({ ...data, age: 32 })}>
        Обновить данные
      </Button>
      <DataBoundary data={data} onDataChange={setIsValid}>
        <Stack mode="v">
          <DataBoundaryNotification />
          <div>
            Имя: <Data name="имя">{data.name}</Data>
          </div>
          <div>
            Фамилия: <Data name="фамилия">{data.surname}</Data>
          </div>
          <div>
            Возраст: <Data name="Возраст">{data.age}</Data>
          </div>
          <div>
            Имя1: <Data name="имя1">{data.name1}</Data>
          </div>
          <div>
            Фамилия1: <Data name="фамилия1">{data.surname1}</Data>
          </div>
          <div>
            Возраст1: <Data name="Возраст1">{data.age1}</Data>
          </div>
          <div>
            Имя2: <Data name="имя2">{data.name2}</Data>
          </div>
          <div>
            Фамилия2: <Data name="фамилия2">{data.surname2}</Data>
          </div>
          <div>
            Возраст2: <Data name="Возраст2">{data.age2}</Data>
          </div>
        </Stack>
      </DataBoundary>
    </Page>
  );
}

export default MainPage;
