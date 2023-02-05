import { AppRouter } from 'app/providers';
import { useTheme } from 'shared/utils/theme';
import { getClassNames } from 'shared/utils/classNames/getClassNames';
import { Navbar } from 'widgets/Navbar';
import './styles/index.scss';


function App() {
  const {theme, toggleTheme} = useTheme();

  return (
    <div className={getClassNames('app', {}, [theme])}>
      <Navbar />
      <button onClick={toggleTheme}>ToggleTheme</button>
      <AppRouter />
    </div>
  );
}

export default App;
