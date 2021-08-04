import Http from "./request";

/**
 * @param data 入参
 * @returns promise
 */

export function getSysParam(data = {}) {
  return Http({
    url: "/shop/getSysParam",
    data
  });
}

export function getFirstLvGroup(data = {}) {
  return Http({
    url: "/shop/getFirstLvGroup",
    data,
    prefix: "MALL_PREFIX"
  });
}
