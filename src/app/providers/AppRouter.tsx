import { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { routesConfig } from 'shared/config/routesConfig';

function AppRouter() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        {routesConfig.map(({path, element}) => (
          <Route path={path} element={element} key={path} />
        ))}
      </Routes>
    </Suspense>
  );
}

export default AppRouter;
