import React, { lazy, Suspense } from 'react';
import { useRoutes } from 'react-router-dom';

import AuthComponent from '@/components/AuthComponent';

// 懒加载组件
const Layouts = lazy(() => import('@/layout'));
const Login = lazy(() => import('@/pages/Login'));
// const Home = lazy(() => import('@/pages/Home'));
// const Article = lazy(() => import('@/pages/Article'));
// const Publish = lazy(() => import('@/pages/Publish'));

import Article from '@/pages/Article';
import Home from '@/pages/Home';
import Publish from '@/pages/Publish';

const routes = [
  {
    path: '/',
    element: (
      <AuthComponent>
        <Layouts />
      </AuthComponent>
    ),
    children: [
      { index: true, element: <Home /> },
      { path: '/article', element: <Article /> },
      { path: '/publish', element: <Publish /> },
    ],
  },
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
