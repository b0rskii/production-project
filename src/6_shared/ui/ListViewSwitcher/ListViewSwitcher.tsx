import { PropsWithChildren, memo } from 'react';
import { getClassNames } from '6_shared/utils/classNames';
import { Button, ButtonTheme } from '6_shared/ui/Button';
import TilesIcon from '6_shared/assets/icons/tiles.svg';
import ListIcon from '6_shared/assets/icons/list.svg';
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
  onControlClick: (view: ListView) => void;
}>;

export const ListViewSwitcher = memo((props: ListViewSwitcherProps) => {
  const { className, activeControl, onControlClick } = props;

  return (
    <div className={getClassNames(style.listViewSwitcher, {}, [className])}>
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
    </div>
  );
});
