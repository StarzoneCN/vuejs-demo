const globalData0 = 'globalData0';

export default {
  globalData0,
  ResourceServerHost: 'http://localhost:81',
  AuthServerHost: 'http://localhost',
  URL_OAUTH_AUTHORIZE: '/oauth/authorize',
  URL_OAUTH_TOKEN: '/oauth/token',
  URL_LOGIN: '/login',

  /*应用信息*/
  client_id: 'test_oauth_client',
  client_secret: 'hahahuhu',
  grant_type: 'authorization_code',
  auth_redirect_uri: 'http://localhost/security/code',
  scope: 'app',
  response_type: 'code'
}
