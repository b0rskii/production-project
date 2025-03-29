/* eslint-disable i18next/no-literal-string */
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Page } from '@/3_widgets/Page';
import { I18nNameSpace } from '@/6_shared/utils/i18n/nameSpace';
import { Transition } from '@/6_shared/utils/transition/Transition';
import { Button, ButtonTheme } from '@/6_shared/ui/Button';

function MainPage() {
  const { t } = useTranslation(I18nNameSpace.Main);
  const [show, setShow] = useState(false);

  return (
    <Page data-testid="MainPage">
      {t('Главная страница')}
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            width: 'fit-content',
          }}
        >
          <Button theme={ButtonTheme.OUTLINE} onClick={() => setShow(!show)}>
            toggle
          </Button>
          <Transition
            isShow={show}
            // enterFrom={{ transform: 'translateX(-150%)', opacity: '0' }}
            // leaveTo={{ transform: 'translateX(150%)', opacity: '0' }}
            // transition="all .5s"
            enterAnimation="show .5s"
            leaveAnimation="hide .7s"
          >
            <Button theme={ButtonTheme.OUTLINE} onClick={() => setShow(!show)}>
              toggle
            </Button>
          </Transition>
        </div>
      </div>
    </Page>
  );
}

export default MainPage;
