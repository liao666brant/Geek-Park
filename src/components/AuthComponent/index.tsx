import React, { ReactElement } from 'react';
import { Navigate } from 'react-router-dom';

import { getToken } from '@/utils';

/**
 *路由鉴权高阶组件
 *插槽插入需要鉴权的组件
 */
export default function AuthComponent({ children }: { children: ReactElement }) {
  const isToken = getToken();
  if (isToken) {
    return <>{children}</>;
  } else {
    return <Navigate to={'/login'}></Navigate>;
  }
}
