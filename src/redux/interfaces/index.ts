/** 状态管理器 redux 相关类型定义 */

/** global slice 对象类型接口 */
export interface GlobalState {
  collapsed: boolean; // 是否折叠左侧菜单
}

/** list slice 对象类型接口 */
export interface ListState {
  loading: boolean;
  test: boolean;
  contractList: Contract[];
  current: number;
  pageSize: number;
  total: number;
}

export interface Contract {
  adminName: string;
  amount: string;
  contractType: number;
  index: number;
  name: string;
  no: string;
  paymentType: 1 | 2;
  status: number;
  updateTime: string;
}
