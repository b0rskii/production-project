import { useState } from 'react';
import { getClassNames } from 'shared/utils/classNames/getClassNames';
import { ThemeSwitcher } from 'shared/ui/ThemeSwitcher';
import { LangSwitcher } from 'shared/ui/LangSwitcher';
import style from './Sidebar.module.scss';

type SidebarProps = {
  className?: string;
};

export const Sidebar: React.FC<SidebarProps> = (props) => {
  const {className} = props;
  const [collapsed, setCollapsed] = useState(false);

  const onToggleButtonClick = () => {
    setCollapsed((prev) => !prev)
  };

  return (
    <div className={getClassNames(style.sidebar, {[style.collapsed]: collapsed}, [className])}>
      <button onClick={onToggleButtonClick}>Toggle</button>
      <div className={style.switchers}>
        <ThemeSwitcher />
        <LangSwitcher />
      </div>
    </div>
 );
}
