/** demo 路由 */
import { lazy } from 'react';

import { RouteObject } from '@/router/interfaces';

const demo: RouteObject[] = [
  {
    path: '/demo',
    meta: {
      title: '示例页',
    },
    children: [
      {
        path: 'list',
        Component: lazy(() => import('@/pages/Demo/List')),
        meta: {
          title: '列表',
        },
      },
    ],
  },
];

export default demo;
