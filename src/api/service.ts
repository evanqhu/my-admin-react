/** 封装 axios */
import type {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  CreateAxiosDefaults,
  InternalAxiosRequestConfig,
} from 'axios';
import axios from 'axios';

import { AxiosCanceler } from '@/api/helper/axiosCanceler';

/** 响应数据格式，与后端协商确定 */
export interface ResponseData<T> {
  code: number;
  message: string;
  data?: T;
}

/** 请求配置参数中自定义 data 属性的数据格式 */
export interface RequestConfigData {
  cancelRequest?: boolean; // 是否取消重复请求
  // retry?: number; // 请求重试次数
  // retryDelay?: number; // 请求重试时间间隔
  // cache?: boolean; // 是否缓存请求
  // setExpireTime?: number; // 设置缓存时间
}

/** 请求状态码枚举类型 */
export enum RequestEnum {
  SUCCESS = 0,
  TIMEOUT = 10000,
}

/** 创建 axios 实例时的配置项 */
const config = {
  // 默认地址请求地址，可在 .env 开头文件中修改
  baseURL: import.meta.env.VITE_API_ROOT, // 例如：https://api.example.com
  // 设置超时时间
  timeout: RequestEnum.TIMEOUT,
  // 跨域时候允许携带凭证
  withCredentials: true,
};

/* 用于创建 axios 实例的类 */
class RequestFactory {
  // 显式声明实例属性
  private instance: AxiosInstance;

  constructor(config: CreateAxiosDefaults<RequestConfigData>) {
    // 创建 axios 实例
    this.instance = axios.create(config);

    // 1️⃣ 请求拦截器
    this.instance.interceptors.request.use(
      (config: InternalAxiosRequestConfig<RequestConfigData>) => {
        // 这里的 data 原本是 json 字符串，但是自动转换成了对象
        const { data = {} } = config;
        // 默认可以取消请求
        const { cancelRequest = true } = data;
        // 将当前请求添加到 pending 中
        if (cancelRequest) {
          AxiosCanceler.addPending(config);
        }
        // 还可以添加 token 等
        return config;
      },
      (error: AxiosError) => Promise.reject(error),
    );

    // 2️⃣ 响应拦截器
    this.instance.interceptors.response.use(
      (response: AxiosResponse<ResponseData<any>>): any => {
        if (response.status === 200) {
          const { data, config } = response;
          // 请求结束成功后，移除本次请求
          AxiosCanceler.removePending(config);
          if (data.code === RequestEnum.SUCCESS) {
            return data;
          }
          console.error(`😰😰😰 响应数据状态码异常：\n`, data);
          // reject() 中的内容会作为 error 对象传递给 .catch 方法或者 try catch 的 catch 方法
          // 这里 reject() 函数中可以不传参数，尽量不在每个请求中都用 catch 方法来打印错误信息，没必要，在这里全局打印一次即可
          // 如果不 return，程序会一直向下执行，如果到函数体结束都没有 return，会当做 return undefined
          // 只有 return 一个 Promise.reject()，才能在后面的 catch 中捕获到，否则都会走 await 成功后面的程序
          return Promise.reject(data);
        }
        console.error(`😰😰😰 网络请求结果异常：\n`, response);
        return Promise.reject(response);
      },
      (error: AxiosError) => {
        const { config } = error;
        // 请求失败时，移除本次请求
        AxiosCanceler.removePending(config!);
        console.error(`😰😰😰 网络请求失败：\n`, error);
        return Promise.reject(error);
      },
    );
  }

  /**
   * 🎯 封装 get 请求
   * @param url 请求地址
   * @param config 请求配置对象
   */
  get<T, R = ResponseData<T>, D = RequestConfigData>(url: string, config?: AxiosRequestConfig<D>): Promise<R> {
    return this.instance.get(url, config);
  }

  /**
   * 🎯 封装 post 请求
   * @param url 请求地址
   * @param data 携带的参数
   * @param config 请求配置对象
   */
  post<T, R = ResponseData<T>, D = RequestConfigData>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig<D>,
  ): Promise<R> {
    return this.instance.post(url, data, config);
  }

  /**
   * 🎯 封装 put 请求
   * @param url 请求地址
   * @param data 携带的参数
   * @param config 请求配置对象
   */
  put<T, R = ResponseData<T>, D = RequestConfigData>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig<D>,
  ): Promise<R> {
    return this.instance.put(url, data, config);
  }

  /**
   * 🎯 封装 delete 请求
   * @param url 请求地址
   * @param config 请求配置对象
   */
  delete<T, R = ResponseData<T>, D = RequestConfigData>(url: string, config?: AxiosRequestConfig<D>): Promise<R> {
    return this.instance.delete(url, config);
  }
}

export default new RequestFactory(config);

/** 案例 1 (不使用 try catch) */
// export const getContractList = async (params: List.ContractListReq) => {
//   const result = await request.get<List.ContractListRes>('/api/get-list', {
//     data: {
//       cancelRequest: false, // 默认为 true
//     },
//   });
//   console.log('🚀🚀🚀 ContractListResult: ', result);
//   const { data } = result;
//   return data;
// };

/** 案例 2 (使用 try catch) */
// 使用 try catch：当 await 后面的异步函数 rejected 时，程序执行 catch 中的代码，不会中断
// 这样有利于处理异常情况，可以指定出现异常时该接口的返回值
// export const getContractList = async (params: List.ContractListReq) => {
//   try {
//     const result = await request.get<List.ContractListRes>('/api/get-list', {
//       data: {
//         cancelRequest: true,
//       },
//     });
//     const { data } = result;
//     return data;
//   } catch () {
//     return {};
//   }
// };

/** 案例 3 (使用 catch) */
// 直接在 await 后面使用 catch 函数：当 await 后面的异步函数 rejected 时，程序执行 catch 中的代码，不会中断
// export const getContractList = async (params: List.ContractListReq) => {
//   const result = await request.get<List.ContractListRes>('/ap/get-list', {
//       data: {
//         cancelRequest: false, // 默认为 true
//       },
//     })
//     .catch(() => ({}));
//   const { data } = result;
//   return data;
// };

/** 案例 4 (使用辅助函数) */
// const handleRequest = async (asyncFunc) => {
//   try {
//     const result = await asyncFunc;
//     return [result, null];
//   } catch (error) {
//     return [null, error];
//   }
// };

// export const getContractList = async (params: List.ContractListReq) => {
//   const [result, error] = await handleRequest(
//     request.get<List.ContractListRes>('/api/get-list', {
//       data: {
//         cancelRequest: false, // 默认为 true
//       },
//     }),
//   );
//   if (error) return {};
//   const { data } = result;
//   return data;
// };
