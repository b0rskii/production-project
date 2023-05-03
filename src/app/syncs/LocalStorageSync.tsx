import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { articlesSelectors } from 'entities/Article';
import { LocalStorageKey } from 'shared/const/localStorage';

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
    if (isInit) isInit = false;
  }, []);

  return null;
};
