/**
 * 拼接uri： 主要去除uri分解符'/'的烦恼
 * @param pre
 * @param suf
 * @returns {string}
 */
export const jointUri = (pre, suf) => {
  if (typeof pre !== 'string' || typeof suf !== 'string') {
    console.error("uri address is not a string!");
  }
  if (!pre || !pre.trim() || !suf || !suf.trim()){
    return pre && pre.trim() ? pre : suf;
  }
  if (!pre.endsWith('/') && !suf.startsWith('/')) {
    return pre + '/' + suf;
  } else if (pre.endsWith('/') && suf.startsWith('/')) {
    return pre + suf.substr(1);
  } else {
    return pre + suf;
  }
};

/**
 * 将object的key-value对，转换成uri-param字符串形式
 * @param params 参数对象（如： {age: 10, name: 'Tom'}）
 * @returns {string|*}  uri-param字符串（如： age=10&name=Tom）
 */
export const params2uriStr = (params) => {
  if (!params) {
    return '';
  }
  if (typeof params !== 'object') {
    return params;
  }
  const _keys = Object.keys(params);
  if (_keys.length == 0) {
    return '';
  }
  let _paramsStr = '';
  _keys.forEach(_key => {
    _paramsStr += _key + '=' + params[_key] + '&';
  })
  return  _paramsStr.substr(0, _paramsStr.length -1);
}

/**
 * 将object类型的uri参数拼接到uri中
 * @param uri
 * @param params
 * @returns {string|string|*|*}
 */
export const appendParams2uri = (uri, params) => {
  if (typeof uri !== 'string'){
    return uri;
  }
  if (!uri || !uri.trim()) {
    return params2uriStr(params);
  }
  if (!params) {
    return uri;
  }
  const paramStr = params2uriStr(params);
  if (typeof paramStr !== 'string') {
    return uri;
  }
  uri = uri.trim();
  if (uri.endsWith('?')) {
    return strippingTailStr(uri, '?') + '?' + paramStr;
  } else if (uri.endsWith('&')) {
    return uri + paramStr;
  } else if (/\?/g.exec(uri).index >= 0) {
    return uri + '&' + paramStr;
  } else {
    return uri + '?' + paramStr;
  }
}

/**
 * 剥离尾端指定的字符串
 * @param sourceStr 被操作的字符串
 * @param strippingStr 需要从sourceStr尾端剥离掉的字符串
 */
const strippingTailStr = (sourceStr, strippingStr) => {
  if (!strippingStr || typeof strippingStr !== 'string' || !strippingStr.trim()
    || !sourceStr || typeof sourceStr !== 'string' || !sourceStr.trim()) {
    return sourceStr;
  }
  if (sourceStr.endsWith(strippingStr)) {
    return  strippingTailStr(sourceStr.substr(0, sourceStr.length - strippingStr.length), strippingStr);
  }
  return sourceStr;
}

export default {jointUri, params2uriStr, appendParams2uri}
