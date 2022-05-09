import React, { lazy, Suspense } from 'react';
import { useRoutes } from 'react-router-dom';

import AuthComponent from '@/components/AuthComponent';

// 懒加载组件
const Layouts = lazy(() => import('@/layout'));
const Home = lazy(() => import('@/pages/Home'));
const Login = lazy(() => import('@/pages/Login'));

const routes = [
  {
    path: '/',
    element: (
      <AuthComponent>
        <Layouts />
      </AuthComponent>
    ),
  },
  { path: '/home', element: <Home /> },
  { path: '/login', element: <Login /> },
];

const RouterView = () => {
  const element = useRoutes(routes);
  return (
    <Suspense
      fallback={
        <div
          style={{
            textAlign: 'center',
            marginTop: 200,
          }}
        >
          loading...
        </div>
      }
    >
      {element}
    </Suspense>
  );
};

export default RouterView;
