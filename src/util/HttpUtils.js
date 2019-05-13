const get = axios.get(config).catch((err) => {
  if (err.response.status == 401) {
    if (process.env.NODE_ENV === 'development') {
      /*如果是本机测试环境，直接跳转到本地登录页面*/
      this.$router.push({
          path: '/login'
        });
    } else {
      top.location = 'http://angelapi.bluemoon.com.cn/portal-admin/login.html';
    }
  }
})
