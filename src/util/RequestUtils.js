import axios from 'axios';
import {portalLoginHttpUri, serverContext} from '@/constant/UriConstants'
import StrUtils from '@/util/StringUtils'
import router from '@/router'

const baseConfig = {

};

export const get = (uri, config) => {
  if (!uri || !uri.trim()){
    console.warn('uri address can\'t be null');
    return ;
  }
  const _c = Object.assign({}, baseConfig, config);
  return axios.get(StrUtils.jointUri(serverContext, uri), _c).catch((err) => {
    if (err.response.status == 401) {
      if (process.env.NODE_ENV === 'development') {
        /*如果是本机测试环境，直接跳转到本地登录页面*/
        router.push({
          path: '/login'
        });
      } else {
        top.location = portalLoginHttpUri;
      }
    }
  });
}

export const post = (uri, config) => {
  if (!uri || !uri.trim()){
    console.warn('uri address can\'t be null');
    return ;
  }
  const _c = Object.assign({}, baseConfig, config);
  return axios.post(StrUtils.jointUri(serverContext, uri), _c).catch((err) => {
    if (err.response.status == 401) {
      if (process.env.NODE_ENV === 'development') {
        /*如果是本机测试环境，直接跳转到本地登录页面*/
        router.push({
          path: '/login'
        });
      } else {
        top.location = portalLoginHttpUri;
      }
    }
  });
}

export default {get, post}
