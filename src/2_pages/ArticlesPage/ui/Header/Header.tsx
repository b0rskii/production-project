import { PropsWithChildren, memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { articlesActions, articlesSelectors } from '5_entities/Article';
import { getClassNames } from '6_shared/utils/classNames';
import { useAppDispatch } from '6_shared/utils/redux';
import { ListView, ListViewSwitcher } from '6_shared/ui/ListViewSwitcher';

type HeaderProps = PropsWithChildren<{
  className?: string;
}>;

export const Header = memo((props: HeaderProps) => {
  const { className } = props;
  const dispatch = useAppDispatch();

  const articlesTotal = useSelector(articlesSelectors.getArticles.selectTotal);
  const articleView = useSelector(articlesSelectors.getView);

  const onViewControlClick = useCallback((view: ListView) => {
    dispatch(articlesActions.setView(view));
  }, [dispatch]);

  if (!articlesTotal) {
    return null;
  }

  return (
    <section className={getClassNames('', {}, [className])}>
      <ListViewSwitcher
        activeControl={articleView}
        onControlClick={onViewControlClick}
      />
    </section>
  );
});
