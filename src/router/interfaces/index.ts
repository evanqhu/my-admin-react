/** 路由 router 相关类型定义 */
import { BrowserRouterProps } from 'react-router-dom';

// 单条路由接口类型定义
export interface RouteObject {
  path: string;
  // redirect?: string;
  Component?: React.FC<BrowserRouterProps> | (() => any);
  isFullPage?: boolean; // 当前路由是否全屏显示
  // meta 未赋值 路由不显示到菜单中
  meta?: {
    title?: string; // 菜单显示的标题
    icon?: string; // 图标
    hidden?: boolean; // 侧边栏隐藏该路由
    single?: boolean; // 单层路由
    group?: string; // 分组
  };
  children?: RouteObject[];
}
