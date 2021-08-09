/**
 * 公用工具
 */

/**
 * 防抖
 * @param {*} func 防抖方法
 * @param {*} wait 防抖间隔
 * @param {*} immediate
 */
export function debounce(func: Function, wait: number, immediate: boolean) {
  let timeout: any = null;
  let args: any = null;
  let context: any = null;
  let timestamp = 0;
  let result: any = null;

  const later = () => {
    // 据上一次触发时间间隔
    const last = Number(new Date()) - timestamp;

    // 上次被包装函数被调用时间间隔 last 小于设定时间间隔 wait
    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last);
    } else {
      timeout = null;
      // 如果设定 immediate：true，因为开始边界已经调用过了此处无需调用
      if (!immediate) {
        result = func.apply(context, args);
        if (!timeout) context = args = null;
      }
    }
  };

  return function (that: any, ...args: any) {
    context = that;
    timestamp = Number(new Date());
    const callNow = immediate && !timeout;
    // 如果延时不存在，重新设定延时
    if (!timeout) timeout = setTimeout(later, wait);
    if (callNow) {
      result = func.apply(context, args);
      args = null;
      context = null;
    }

    return result;
  };
}

/**
 * 数字转换为百分比
 * @param {number} number 待转换的数字
 * @param {number} exact 保留的小数位数
 * @param {boolean} needFlag 是否需要添上百分号
 * @return {string}
 */
export function parsePercentage(num: number, exact = 2, needFlag: boolean) {
  if (isNaN(num)) {
    return '--';
  }
  num = Number((num * 100).toFixed(exact));
  return needFlag ? num + '%' : num;
}

/**
 * 数字添加符号
 * @param num 数字
 */
export function formatSymbol(num: number | string) {
  const val = Number(num);
  if (val) {
    if (val > 0) return '+' + val;
  } else {
    return '';
  }
}

/**
 * 数字超过百万的显示万，使用金钱计数方式，并保留两位小数
 * @param number
 * @param decimalDigit
 * @param useMoneyType // 是否采用金钱计数方式
 * @returns {*|*}
 */
export function addWanChineseUnit(number: number, decimalDigit: number, useMoneyType: boolean) {
  const getDigit = function (integer: number) {
    let digit = -1;
    while (integer >= 1) {
      digit++;
      integer = integer / 10;
    }
    return digit;
  };

  const addWan = function (integer: number, number: number, mutiple: number, decimalDigit: number): string {
    const digit = getDigit(integer);
    let result: any = '';
    if (digit > 3) {
      let remainder = digit % 8;
      if (remainder >= 5) {
        // ‘十万’、‘百万’、‘千万’显示为‘万’
        remainder = 4;
      }
      result =
        Math.round(number / Math.pow(10, remainder + mutiple - decimalDigit)) /
        Math.pow(10, decimalDigit);
      if (useMoneyType) {
        result = (Math.round(result * 100) / 100)
          .toFixed(decimalDigit)
          .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      }
      return result + '万';
    } else {
      result =
        Math.round(number / Math.pow(10, mutiple - decimalDigit)) /
        Math.pow(10, decimalDigit);
      if (useMoneyType) {
        result = (Math.round(result * 100) / 100)
          .toFixed(decimalDigit)
          .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      }
      return result;
    }
  };
  return (function (number: number, decimalDigit: number): string {
    decimalDigit = decimalDigit === null ? 2 : decimalDigit;
    const integer = Math.floor(number);
    const digit = getDigit(integer);
    // ['个', '十', '百', '千', '万', '十万', '百万', '千万'];
    const unit: any = [];
    if (digit > 5) {
      const multiple = Math.floor(digit / 8);
      if (multiple >= 1) {
        const tmp = Math.round(integer / Math.pow(10, 8 * multiple));
        unit.push(addWan(tmp, number, 8 * multiple, decimalDigit));
        for (let i = 0; i < multiple; i++) {
          unit.push('亿');
        }
        return unit.join('');
      } else {
        return addWan(integer, number, 0, decimalDigit);
      }
    } else {
      if (useMoneyType) {
        return (Math.round(number * 100) / 100)
          .toFixed(decimalDigit)
          .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      } else {
        return (Math.round(number * 100) / 100).toFixed(decimalDigit);
      }
    }
  })(number, decimalDigit);
}

/**
 * 过滤字符串数组, 去除字符串中的空值
 * @param {Object | String} n 
 * @returns 
 */
export function fixListString(n: any) {
  if (n === 'null' || n === 'undefined' || n === 'NaN') {
    return [];
  } else if (!n && parseInt(n) !== 0) {
    return [];
  } else {
    if (typeof n === 'string') {
      return n ? n.split(',').filter((item) => item && item.trim()) : [];
    } else if (typeof n === 'object' && n.length) {
      return n.filter((item: any) => {
        return item && item.trim();
      });
    } else {
      return n;
    }
  }
}
