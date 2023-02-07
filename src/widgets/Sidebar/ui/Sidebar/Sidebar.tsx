import { useState } from 'react';
import { getClassNames } from 'shared/utils/classNames/getClassNames';
import { ThemeSwitcher } from 'shared/ui/ThemeSwitcher';
import style from './Sidebar.module.scss';

type SidebarProps = {
  className?: string;
};

export const Sidebar: React.FC<SidebarProps> = (props) => {
  const {className} = props;
  const [collapsed, setCollapsed] = useState(false);

  const onToggle = () => {
    setCollapsed((prev) => !prev)
  };

  return (
    <div className={getClassNames(style.sidebar, {[style.collapsed]: collapsed}, [className])}>
      <button onClick={onToggle}>Toggle</button>
      <div className={style.switchers}>
        <ThemeSwitcher />
      </div>
    </div>
 );
}
