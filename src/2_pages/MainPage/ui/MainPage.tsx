/* eslint-disable i18next/no-literal-string */
import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Page } from '@/3_widgets/Page';
import { I18nNameSpace } from '@/6_shared/utils/i18n/nameSpace';
import s from './MainPage.module.scss';

const MIN_WIDTH = 320;

function MainPage() {
  const { t } = useTranslation(I18nNameSpace.Main);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const callback = () => {
      if (!ref.current) return;
      const COLS = 3;
      const gap = 16;

      // ширина контейнера
      const wrapperWidth = ref.current.clientWidth;
      // количество влезающих элементов с минимальной шириной без учета гэпа
      const cleanItemsCount = Math.floor(wrapperWidth / MIN_WIDTH);
      // количество влезающих элементов с минимальной шириной с учетом гэпа
      const itemsCountWithGap =
        (wrapperWidth - gap * (cleanItemsCount - 1)) / MIN_WIDTH;
      // финальное количество колонок
      const columnsCount = Math.min(Math.floor(itemsCountWithGap), COLS);

      ref.current.style.setProperty('--columns-count', columnsCount.toString());
    };
    callback();
    window.addEventListener('resize', callback);
  }, []);

  return (
    <Page data-testid="MainPage">
      {t('Главная страница')}
      <div className={s.wrapper} ref={ref}>
        <div className={s.item}>rghtrht htr htrhtrh</div>
        <div className={s.item}>
          rghtrht htr htrhtrh rghtrht htr htrhtrh rghtrht htr htrhtrh rghtrht
          htr htrhtrh rghtrht htr htrhtrh rghtrht htr htrhtr
        </div>
        <div className={s.item}>rghtrht htr htrhtrh </div>
        <div className={s.item}>
          rghtrht htr htrhtrh rghtrht htr htrhtrhrghtrht htr htrhtrh
        </div>
      </div>
    </Page>
  );
}

export default MainPage;
