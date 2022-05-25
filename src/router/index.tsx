import React from 'react';
import { useRoutes } from 'react-router-dom';

import AuthComponent from '@/components/AuthComponent';
import LazyRouterComponent from '@/router/LazyRouterComponent';

// 懒加载组件
const Layouts = LazyRouterComponent(() => import('@/layout'));
const Login = LazyRouterComponent(() => import('@/pages/Login'));
const Home = LazyRouterComponent(() => import('@/pages/Home'));
const Article = LazyRouterComponent(() => import('@/pages/Article'));
const Publish = LazyRouterComponent(() => import('@/pages/Publish'));

// import Article from '@/pages/Article';
// import Home from '@/pages/Home';
// import Publish from '@/pages/Publish';

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
  return element;
};

export default RouterView;
