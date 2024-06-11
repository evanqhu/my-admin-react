/** 定义路由器 */
import { lazy } from 'react';
import { Navigate, useRoutes } from 'react-router-dom';

import { RouteObject } from '@/router/interfaces';
import demo from '@/router/modules/demo';

/** 常量路由 */
const rootRoutes: RouteObject[] = [
  {
    path: '/login',
    Component: lazy(() => import('@/pages/Login')),
    isFullPage: true,
    meta: { hidden: true },
  },
  {
    path: '/',
    Component: () => Navigate({ to: '/demo/list' }),
  },
];

/** 全部路由规则数组 */
export const allRoutes = [...rootRoutes, ...demo];
// console.log('🚀🚀🚀  allRoutes: ', allRoutes);

/** 创建一个 React 组件，该组件根据传入的路由配置渲染相应的路由元素 */
const Router = () => useRoutes(allRoutes);

// 默认对外暴露路由组件
export default Router;
