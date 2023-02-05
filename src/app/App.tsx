import { Link } from 'react-router-dom';
import { AppRouter } from 'app/providers';
import { useTheme } from 'shared/utils/theme';
import { getClassNames } from 'shared/utils/classNames/getClassNames';
import { RoutePath } from 'shared/config/routesConfig';
import './styles/index.scss';

function App() {
  const {theme, toggleTheme} = useTheme();

  return (
    <div className={getClassNames('app', {}, [theme])}>
      <button onClick={toggleTheme}>ToggleTheme</button>
      <Link to={RoutePath.MAIN}>Main</Link>
      <Link to={RoutePath.ABOUT}>About</Link>
      <AppRouter />
    </div>
  );
}

export default App;
