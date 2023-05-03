import { PropsWithChildren, memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { articlesActions, articlesSelectors } from 'entities/Article';
import { getClassNames } from 'shared/utils/classNames';
import { useAppDispatch } from 'shared/utils/redux';
import { ListView, ListViewSwitcher } from 'shared/ui/ListViewSwitcher';

type HeaderProps = PropsWithChildren<{
  className?: string;
}>;

export const Header = memo((props: HeaderProps) => {
  const { className } = props;
  const dispatch = useAppDispatch();

  const articleView = useSelector(articlesSelectors.getView);

  const onViewControlClick = useCallback((view: ListView) => {
    dispatch(articlesActions.setView(view));
  }, [dispatch]);

  return (
    <div className={getClassNames('', {}, [className])}>
      <ListViewSwitcher
        activeControl={articleView}
        onControlClick={onViewControlClick}
      />
    </div>
  );
});
