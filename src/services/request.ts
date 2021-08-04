import Qs from "qs";
import axios from "axios";
import { TIMEOUT } from "../constant";
import { Toast } from "vant";
import { IDefaultConfig } from "../interface/common";
import { addPending, removePending } from "./pending";

const codeMessage: any = {
  200: "服务器成功返回请求的数据。",
  201: "新建或修改数据成功。",
  202: "一个请求已经进入后台排队（异步任务）。",
  204: "删除数据成功。",
  400: "发出的请求有错误，服务器没有进行新建或修改数据的操作。",
  401: "用户没有权限（令牌、用户名、密码错误）。",
  403: "用户得到授权，但是访问是被禁止的。",
  404: "发出的请求针对的是不存在的记录，服务器没有进行操作。",
  406: "请求的格式不可得。",
  410: "请求的资源被永久删除，且不会再得到的。",
  422: "当创建一个对象时，发生一个验证错误。",
  500: "服务器发生错误，请检查服务器。",
  502: "网关错误。",
  503: "服务不可用，服务器暂时过载或维护。",
  504: "网关超时。"
};

// 处理返回的数据格式
function handleSuccess(response: any) {
  const prefix = response.config.prefix;
  const res = response.data;
  const prefixDataMap: any = {
    HOME_PREFIX() {
      const errorNo = res.code;
      if (errorNo === "0") {
        return res.data;
      } else if (errorNo === "20") {
        Toast.clear();
        return Promise.reject("接口超时");
      } else {
        Toast(res.data.errorInfo);
        return Promise.reject(res.data.errorInfo);
      }
    },
    MALL_PREFIX() {
      const errorNo = res.code;
      if (errorNo === "0") {
        return res.data;
      } else if (errorNo === "20") {
        Toast.clear();
        return Promise.reject("接口超时");
      } else {
        Toast(res.data.errorInfo);
        return Promise.reject(res.data.errorInfo);
      }
    }
  };
  return prefixDataMap[prefix]();
}

// 核对http码
function checkStatus(response: any) {
  // 如果http状态码正常，则直接返回数据
  if (response) {
    const { status, statusText } = response;

    if ((status >= 200 && status < 300) || status === 304) {
      // 如果不需要除了data之外的数据，可以直接 return response.data
      return handleSuccess(response);
    }

    return codeMessage[status] || statusText;
  }
  // 异常状态下，把错误信息返回去
  return {
    status: -404,
    msg: "网络异常"
  };
}

/**
 * 全局请求扩展配置
 * 添加一个请求拦截器 （于transformRequest之前处理）
 */
const axiosConfig = {
  success: (config: any) => {
    // 在请求开始前，对之前的请求做检查取消操作
    removePending(config);
    // 将当前请求添加到 pending 中
    addPending(config);
    return config;
  },
  error: (error: any) => Promise.reject(error)
};

/**
 * 全局请求响应处理
 * 添加一个返回拦截器 （于transformResponse之后处理）
 * 返回的数据类型默认是json，若是其他类型（text）就会出现问题，因此用try,catch捕获异常
 */
const axiosResponse = {
  success: (response: any) => {
    // 在请求结束后，移除本次请求
    removePending(response);
    return checkStatus(response);
  },
  error: (error: any) => {
    const { response } = error;
    if (axios.isCancel(error)) {
      console.log("repeated request: " + error.message);
    } else {
      // handle error code
    }
    if (response) {
      // 请求已发出，但是不在2xx的范围
      // 对返回的错误进行一些处理
      return Promise.reject(checkStatus(response));
    } else {
      // 处理断网的情况
      // eg:请求超时或断网时，更新state的network状态
      // network状态在app.vue中控制着一个全局的断网提示组件的显示隐藏
      // 关于断网组件中的刷新重新获取数据，会在断网组件中说明
      console.error("断网了~");
    }
  }
};

axios.interceptors.request.use(axiosConfig.success, axiosConfig.error);
axios.interceptors.response.use(axiosResponse.success, axiosResponse.error);

/**
 * 基于axios ajax请求
 * @param url
 * @param method
 * @param data
 * @param headers
 * @param dataType
 * @returns {Promise.<T>}
 */
export default function request({
  url,
  method,
  data,
  prefix = "HOME_PREFIX",
  headers = {}
}: any) {
  headers = Object.assign(
    method === "get"
      ? {
          "Accept": "application/json",
          "Content-Type": "application/json; charset=UTF-8"
        }
      : {
          "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
        },
    headers
  );

  const contentType = headers["Content-Type"];

  const defaultConfig: IDefaultConfig = {
    url,
    method: method || "post",
    timeout: TIMEOUT,
    params: data,
    data,
    prefix,
    headers,
    responseType: "json"
  };

  if (method === "get") {
    delete defaultConfig.data;
    // 给 get 请求加上时间戳参数，避免从缓存中拿数据。
    if (data !== undefined) {
      defaultConfig.params = Object.assign(defaultConfig.params, {
        _t: new Date().getTime()
      });
    } else {
      defaultConfig.params = { _t: new Date().getTime() };
    }
  } else {
    delete defaultConfig.params;
  }

  if (typeof contentType !== "undefined") {
    if (contentType.indexOf("multipart") !== -1) {
      // 类型 `multipart/form-data;`
      // defaultConfig.data = defaultConfig.data;
    } else if (contentType.indexOf("json") !== -1) {
      // 类型 `application/json`
      // 服务器收到的raw body(原始数据) "{name:"jhon",sex:"man"}"（普通字符串）
      defaultConfig.data = JSON.stringify(defaultConfig.data);
    } else {
      // 类型 `application/x-www-form-urlencoded`
      // 服务器收到的raw body(原始数据) name=homeway&key=nokey
      defaultConfig.data = Qs.stringify(defaultConfig.data);
    }
  }

  return axios(defaultConfig as any);
}
