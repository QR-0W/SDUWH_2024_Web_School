import type { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import axios from 'axios';
import { IResponse } from './type';
import { ADMIN_USER_TOKEN, BASE_URL, USER_TOKEN } from '/@/store/constants';

// 创建axios实例
const service: AxiosInstance = axios.create({
  baseURL: BASE_URL + '', // 设置请求的基础URL
  timeout: 15000, // 请求超时时间
});

// axios请求拦截器
service.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // 在请求头中加入管理员和用户的token信息
    config.headers.ADMINTOKEN = localStorage.getItem(ADMIN_USER_TOKEN);
    config.headers.TOKEN = localStorage.getItem(USER_TOKEN);
    return config;
  },
  (error: AxiosError) => {
    // 请求出错时的处理逻辑
    return Promise.reject(error);
  },
);

// axios响应拦截器
service.interceptors.response.use(
  (response: AxiosResponse) => {
    // 响应成功时的处理逻辑
    if (response.status == 200) {
      // 根据后端返回的状态码进行逻辑判断
      if (response.data.code == 0 || response.data.code == 200) {
        return response; // 成功则返回响应数据
      } else {
        return Promise.reject(response.data); // 失败则reject并返回错误信息
      }
    } else {
      return Promise.reject(response.data); // 非200状态码则reject并返回错误信息
    }
  },
  // 响应失败时的处理逻辑
  (error: any) => {
    console.log(error.response.status); // 打印响应状态码
    if (error.response.status == 404) {
      // 处理404错误
      // todo
    } else if (error.response.status == 403) {
      // 处理403错误
      // todo
    }
    return Promise.reject(error); // 返回一个带有拒绝原因的Promise
  },
);

// 封装请求方法，返回Promise
const request = <T = any>(config: AxiosRequestConfig): Promise<T> => {
  const conf = config;
  return new Promise((resolve, reject) => {
    service
      .request<any, AxiosResponse<IResponse>>(conf) // 发起axios请求
      .then((res: AxiosResponse<IResponse>) => {
        const data = res.data; // 获取响应数据
        resolve(data as T); // 成功时resolve数据
      })
      .catch((err) => {
        reject(err); // 失败时reject错误
      });
  });
};

// 封装GET请求方法
export function get<T = any>(config: AxiosRequestConfig): Promise<T> {
  return request({ ...config, method: 'GET' });
}

// 封装POST请求方法
export function post<T = any>(config: AxiosRequestConfig): Promise<T> {
  return request({ ...config, method: 'POST' });
}

export default request; // 导出请求方法

export type { AxiosInstance, AxiosResponse }; // 导出类型定义
