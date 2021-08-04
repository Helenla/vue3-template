/**
 * 公共接口定义
 */

// http入参
export interface IDefaultConfig {
  url: string,
  method: string,
  data?: any,
  timeout: number,
  headers?: any,
  params?: any,
  responseType: string | number,
  prefix: string
}