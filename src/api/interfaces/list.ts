/** 分模块接口相关类型 */
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

/** 合同列表请求参数 */
export interface ContractListReq {
  pageSize: number;
  current: number;
}

/** 合同列表响应参数 */
export interface ContractListRes {
  list: Contract[];
}
