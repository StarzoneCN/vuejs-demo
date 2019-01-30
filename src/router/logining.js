import router from './index'
import { getToken, getExpiresTimestamp } from '@/utils/auth' // getToken from cookie
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css'// progress bar style

const whiteList = ['/login', '/auth-redirect']// no redirect whitelist

router.beforeEach((to, from, next) => {
  NProgress.start() // start progress bar
  if (getToken() && tokenHasNotExpired()) { // determine if there has token
    /* has token*/
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done() // if current page is dashboard will not trigger	afterEach hook, so manually handle it
    } else {
      next();
    }
  } else {
    /* has no token*/
    if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
      next()
    } else { // TODO 可以考虑添加refresh_token
      next(`/login?redirect=${to.path}`) // 否则全部重定向到登录页
      NProgress.done() // if current page is login will not trigger afterEach hook, so manually handle it
    }
  }
})

router.afterEach(() => {
  NProgress.done() // finish progress bar
});

function tokenHasNotExpired() {
  let expiresTimestamp = Number(getExpiresTimestamp());
  if (isNaN(expiresTimestamp) || expiresTimestamp < (new Date().getTime())){
    return false;
  }
  return true;
}
