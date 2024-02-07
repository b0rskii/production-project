import { PropsWithChildren, memo } from 'react';
import { getClassNames } from '@/6_shared/utils/classNames';
import { Button, ButtonTheme } from '@/6_shared/ui/Button';
import { Card } from '@/6_shared/ui/Card';
import TilesIcon from '@/6_shared/assets/icons/tiles.svg?react';
import ListIcon from '@/6_shared/assets/icons/list.svg?react';
import style from './ListViewSwitcher.module.scss';

export type ListView = 'tiles' | 'list';

type ViewControl = {
  Icon: React.VFC<React.SVGProps<SVGSVGElement>>;
  view: ListView;
};

const controls: ViewControl[] = [
  {
    Icon: TilesIcon,
    view: 'tiles',
  },
  {
    Icon: ListIcon,
    view: 'list',
  },
];

type ListViewSwitcherProps = PropsWithChildren<{
  className?: string;
  activeControl: ListView;
  // eslint-disable-next-line no-unused-vars
  onControlClick: (view: ListView) => void;
}>;

export const ListViewSwitcher = memo((props: ListViewSwitcherProps) => {
  const { className, activeControl, onControlClick } = props;

  return (
    <Card className={getClassNames(style.listViewSwitcher, {}, [className])}>
      {controls.map(({ Icon, view }) => (
        <Button
          className={getClassNames(style.control, { [style.active]: activeControl === view }, [])}
          onClick={() => onControlClick(view)}
          theme={ButtonTheme.CLEAR}
          key={view}
        >
          <Icon />
        </Button>
      ))}
    </Card>
  );
});
