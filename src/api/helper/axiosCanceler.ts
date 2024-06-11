import axios, { Canceler, InternalAxiosRequestConfig } from 'axios';
import qs from 'qs';

/** 声明一个 Map 用于存储每个请求的标识 和 取消函数 */
const pendingMap = new Map<string, Canceler>();

/** 序列化参数 (将每个请求序列为一个唯一的字符串，作为请求标识) */
export const getPendingUrl = (config: InternalAxiosRequestConfig) =>
  [config.method, config.url, qs.stringify(config.data), qs.stringify(config.params)].join('&');

export class AxiosCanceler {
  /** 1️⃣ 添加请求 */
  static addPending(config: InternalAxiosRequestConfig) {
    // 在请求开始前，对之前的请求做检查取消操作
    AxiosCanceler.removePending(config);
    const urlKey = getPendingUrl(config); // 例如：get&/api/get-list&cancelRequest=true&

    config.cancelToken =
      config.cancelToken ??
      new axios.CancelToken((cancel) => {
        if (!pendingMap.has(urlKey)) {
          // 如果 pending 中不存在当前请求，则添加进去，值为当前请求的取消函数
          pendingMap.set(urlKey, cancel);
        }
      });
  }

  /** 2️⃣ 移除请求 */
  static removePending(config: InternalAxiosRequestConfig) {
    const urlKey = getPendingUrl(config);

    if (pendingMap.has(urlKey)) {
      // 如果在 pending 中存在当前请求标识，需要取消当前请求，并且移除
      const cancel = pendingMap.get(urlKey);
      cancel && cancel();
      pendingMap.delete(urlKey);
    }
  }

  /** 3️⃣ 清空所有 pending */
  static removeAllPending() {
    pendingMap.forEach((cancel) => {
      cancel && cancel();
    });
    pendingMap.clear();
  }
}
