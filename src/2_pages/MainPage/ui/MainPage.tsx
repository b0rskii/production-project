/* eslint-disable i18next/no-literal-string */
import { useTranslation } from 'react-i18next';
import { Tab } from '@headlessui/react';
import { Page } from '@/3_widgets/Page';
import { I18nNameSpace } from '@/6_shared/utils/i18n/nameSpace';
import { Text } from '@/6_shared/ui/Text';
import { Button, ButtonTheme } from '@/6_shared/ui/Button';
import { FormGeneral } from './FormGeneral';
import style from './MainPage.module.scss';

function MainPage() {
  const { t } = useTranslation(I18nNameSpace.Main);

  return (
    <Page data-testid="MainPage">
      <Text title="Новый объект" />
      <Tab.Group>
        <Tab.List>
          <Tab>Общее</Tab>
          <Tab>Расположение</Tab>
          <Tab>Фотографии</Tab>
          <Tab>Ответственный агент</Tab>
          <Tab>Ссылки</Tab>
        </Tab.List>
        <Tab.Panels className={style.tabs}>
          <Tab.Panel>
            <FormGeneral />
          </Tab.Panel>
          <Tab.Panel>Content 2</Tab.Panel>
          <Tab.Panel>Content 3</Tab.Panel>
          <Tab.Panel>Content 4</Tab.Panel>
          <Tab.Panel>Content 5</Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
      <Button theme={ButtonTheme.OUTLINE}>Отправить на проверку</Button>
    </Page>
  );
}

export default MainPage;
