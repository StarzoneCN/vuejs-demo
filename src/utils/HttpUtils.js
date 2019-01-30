let asyncRequest = async (url = '', data = {}, _config = {}, type = 'GET', method = 'fetch') => {
  type = type.toUpperCase();
  if (type == 'GET') {
    if (url.indexOf('?') >= 0) {
      url += '&' + getUrlString(data);
    } else {
      url += '?' + getUrlString(data);
    }
  }
  if (window.fetch && method == 'fetch') {
    let requestConfig = {
      //cookie既可以同域发送，也可以跨域发送
      // credentials: 'include',
      method: type,
      headers: {},
      // cache: "force-cache"
      ..._config
    };

    if (type == 'POST') {
      if (requestConfig.headers && requestConfig.headers["Content-Type"] === 'application/json') {
        requestConfig.body = JSON.stringify(data);
      } else {
        requestConfig.body = getUrlString(data);
      }
    }
    try {
      let response = await fetch(url, requestConfig);
      return response;
    } catch (error) {
      throw new Error(error);
    }
  } else {
    // TODO 先完成fetch吧，这个else以后再完善
    return new Promise((resolve, reject) => {
      let requestObj;
      if (window.XMLHttpRequest) {
        requestObj = new XMLHttpRequest();
      } else {
        requestObj = new ActiveXObject;
      }

      let sendData = getUrlString(data);
      requestObj.open(type, url, true);
      requestObj.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      requestObj.send(sendData);

      requestObj.onreadystatechange = () => {
        if (requestObj.readyState == 4) {
          if (requestObj.status == 200) {
            resolve(requestObj.response)
          } else {
            reject(requestObj)
          }
        }
      }
    })
  }
};

function getUrlString(data) {
  let dataArr = []; //数据拼接字符串
  if (Object.keys(data).length) {
    Object.keys(data).forEach(key => {
      dataArr.push(key + '=' + data[key])
    })
  } else {
    return ''
  }
  return dataArr.join('&')
}

/**
 * 拼接URI字符串
 * @param pre 前半部分
 * @param post 后半部分
 */
let jointUri = (pre, post) => {
  if (!pre || !post) {
    return pre || post;
  }
  if (pre.endsWith('/') && post.startsWith('/')) {
    return pre + post.substr(1);
  }
  if (!pre.endsWith('/') && !post.startsWith('/')) {
    return pre + post;
  }
  return pre + post;
};

/**
 * 提取url中的参数
 */
let spliteParamsFromUrl = (url) => {
  if (!url && url.indexOf('?') == -1){
    return {};
  }
  let indexOfQuestionMark = url.indexOf('?');
  let paramsStr = url.substr(indexOfQuestionMark + 1);
  let keyValuePairs = paramsStr.split('&');
  let res = {};
  keyValuePairs.forEach(str => {
    res[str.substring(0, str.indexOf('='))] = str.substring(str.indexOf('=')+1);
  });
  return res;
};

export default {
  asyncRequest: asyncRequest,
  jointUri: jointUri,
  spliteParamsFromUrl
}


