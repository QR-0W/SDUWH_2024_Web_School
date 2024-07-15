import axios from 'axios';
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError, InternalAxiosRequestConfig } from 'axios';
import { showMessage } from './status'; // 导入用于显示消息的工具函数
import { IResponse } from './type'; // 导入响应类型
import { getToken, TokenPrefix } from '/@/utils/auth'; // 导入获取token的工具函数和token前缀
import { ADMIN_USER_TOKEN, USER_TOKEN, BASE_URL } from '/@/store/constants'; // 导入常量

// 创建一个axios实例
const service: AxiosInstance = axios.create({
  baseURL: BASE_URL + '', // 基础URL
  timeout: 15000, // 请求超时时间
});

// axios实例拦截请求
service.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // 在请求头中添加token
    config.headers.ADMINTOKEN = localStorage.getItem(ADMIN_USER_TOKEN);
    config.headers.TOKEN = localStorage.getItem(USER_TOKEN);

    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  },
);

// axios实例拦截响应
service.interceptors.response.use(
  (response: AxiosResponse) => {
    // 判断响应状态码
    if (response.status == 200) {
      // 判断业务状态码
      if (response.data.code == 0 || response.data.code == 200) {
        return response;
      } else {
        return Promise.reject(response.data);
      }
    } else {
      return Promise.reject(response.data);
    }
  },
  // 请求失败处理
  (error: any) => {
    console.log(error.response.status);
    if (error.response.status == 404) {
      // todo
    } else if (error.response.status == 403) {
      // todo
    }
    return Promise.reject(error);
  },
);

// 封装请求方法
const request = <T = any>(config: AxiosRequestConfig): Promise<T> => {
  const conf = config;
  return new Promise((resolve, reject) => {
    service.request<any, AxiosResponse<IResponse>>(conf).then((res: AxiosResponse<IResponse>) => {
      const data = res.data;
      resolve(data as T);
    }).catch(err => {
      reject(err);
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

// 导出默认请求方法和类型
export default request;
export type { AxiosInstance, AxiosResponse };
