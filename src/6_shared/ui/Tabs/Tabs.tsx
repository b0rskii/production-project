import { PropsWithChildren, ReactNode, memo } from 'react';
import { getClassNames } from '6_shared/utils/classNames';
import { Card } from '6_shared/ui/Card';
import style from './Tabs.module.scss';

export type Tab = {
  value: string;
  content: ReactNode;
};

type Props = PropsWithChildren<{
  className?: string;
  activeTab: string;
  tabs: Tab[];
  // eslint-disable-next-line no-unused-vars
  onTabClick: (tab: Tab) => void;
}>;

export const Tabs = memo((props: Props) => {
  const { className, activeTab, tabs, onTabClick } = props;

  return (
    <div className={getClassNames(style.tabs, {}, [className])}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab.value;

        return (
          <Card
            className={getClassNames(style.tab, { [style.active]: isActive }, [className])}
            onClick={() => onTabClick(tab)}
            key={tab.value}
          >
            {tab.content}
          </Card>
        );
      })}
    </div>
  );
});
