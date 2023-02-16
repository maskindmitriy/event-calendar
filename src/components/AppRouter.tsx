import React from 'react';
import { Navigate } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';
import { privateRoutes, publicRoutes, RouteNames } from '../routes';
import { useTypedSelector } from '../hooks/useTypedSelector'

export function AppRouter() {
  const { isAuth } = useTypedSelector(state => state.auth)

  return (
    isAuth ?
      <Routes>
        {privateRoutes.map(route =>
          <Route path={route.path}
            element={route.component}
            key={route.path}
          />
        )}
        <Route path='/event' element={<Navigate replace to={RouteNames.EVENT} />} />
      </Routes>
      :
      <Routes>
        {publicRoutes.map(route =>
          <Route path={route.path}
            element={route.component}
            key={route.path}
          />
        )}
        <Route path='/login' element={<Navigate replace to={RouteNames.LOGIN} />} />
      </Routes>

  );
}