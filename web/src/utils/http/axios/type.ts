/**
 * 请求选项接口
 */
export interface RequestOptions {
  // 是否处理请求结果
  isTransformResponse?: boolean;
}

/**
 * 接口响应数据的通用结构
 * @template T 响应数据的类型，默认为 any
 */
export interface IResponse<T = any> {
  code: number | string; // 响应状态码，可以是数字或字符串类型
  result: T; // 响应数据的具体内容
  message: string; // 响应消息，描述请求结果
  status: string | number; // 响应状态，可以是字符串或数字类型
}

/**
 * 用户登录接口
 */
export interface ILogin {
  username: string; // 账户名称
  password: string; // 账户密码
}
