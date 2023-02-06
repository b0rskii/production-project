import { Routing } from 'pages';
import { useTheme } from 'shared/utils/theme';
import { getClassNames } from 'shared/utils/classNames/getClassNames';
import { Navbar } from 'widgets/Navbar';
import './styles/index.scss';

export const App = () => {
  const {theme} = useTheme();

  return (
    <div className={getClassNames('app', {}, [theme])}>
      <Navbar />
      <Routing />
    </div>
  );
};
