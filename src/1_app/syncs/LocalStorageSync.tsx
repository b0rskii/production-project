import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { articlesSelectors } from '@/5_entities/Article';
import { LocalStorageKey } from '@/6_shared/const/localStorage';

let isInit = true;

export const LocalStorageSync = () => {
  const articlesView = useSelector(articlesSelectors.getView);

  useEffect(() => {
    if (isInit) {
      return;
    }

    localStorage.setItem(LocalStorageKey.ARTICLES_VIEW, articlesView);
  }, [articlesView]);

  useEffect(() => {
    isInit = false;
  }, []);

  return null;
};
