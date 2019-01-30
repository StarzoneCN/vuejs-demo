<template>
  <div class="login-container">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on"
             label-position="left">
      <el-form-item prop="username">
        <span class="svg-container">
        </span>
        <el-input
          v-model="loginForm.username"
          placeholder="用户名"
          name="username"
          type="text"
          auto-complete="on"
        />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
        </span>
        <el-input
          v-model="loginForm.password"
          :type="passwordType"
          placeholder="密码"
          name="password"
          auto-complete="on"
          @keyup.enter.native="handleLogin"
        />
        <span class="show-pwd" @click="showPwd">
          <!--<svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'"/>-->
        </span>
      </el-form-item>

      <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;"
                 @click.native.prevent="handleLogin">
        登录
      </el-button>
    </el-form>
  </div>
</template>

<script>
  import HttpUtils from '@/utils/HttpUtils';
  import GlobalConstants from "../../utils/GlobalConstants";
  import {setToken, setRefreshToken, setExpiresTimestamp} from '../../utils/auth';
  import { Base64 } from 'js-base64';

  let thisData = function () {
    /*验证用户名*/
    const validateUsername = (rule, value, callback) => {
      /*if (!isvalidUsername(value)) {
        callback(new Error('Please enter the correct user name'))
      } else {
        callback()
      }*/
      callback();
    };

    /*验证密码*/
    const validatePassword = (rule, value, callback) => {
      /*if (value.length < 6) {
        callback(new Error('The password can not be less than 6 digits'))
      } else {
        callback()
      }*/
      callback();
    };

    return {
      loginForm: {
        username: 'admin',
        password: 'admin'
      },
      loginRules: {
        username: [{required: true, trigger: 'blur', validator: validateUsername}],
        password: [{required: true, trigger: 'blur', validator: validatePassword}]
      },
      passwordType: 'password',
      loading: false,
      redirect: undefined
    }
  };

  /**
   * 获取oauth2的token
   * @param _username 用户名
   * @param _password 用户密码
   * @param _data 请求参数
   */
  let requestToken = (_username, _password, _data={}) => {
    console.log(this);
    let url = HttpUtils.jointUri(GlobalConstants.AuthServerHost, GlobalConstants.URL_OAUTH_AUTHORIZE);
    let requestData = {
      client_id: GlobalConstants.client_id,
      redirect_uri: GlobalConstants.auth_redirect_uri,
      scope: GlobalConstants.scope,
      response_type: GlobalConstants.response_type,
      ..._data
    };
    let requestConfig = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + Base64.encode(_username + ":" + _password)
      }
    };
    HttpUtils.asyncRequest(url, requestData, requestConfig).then((response) => {
      if (response.status == 200){
        let _url = response.url;
        let code = HttpUtils.spliteParamsFromUrl(_url).code;
        if (code){
          url = HttpUtils.jointUri(GlobalConstants.AuthServerHost, GlobalConstants.URL_OAUTH_TOKEN);
          requestData = {
            grant_type: GlobalConstants.grant_type,
            code: code,
            redirect_uri: GlobalConstants.auth_redirect_uri
          };
          requestConfig = {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              'Authorization': 'Basic ' + Base64.encode(GlobalConstants.client_id + ":" + GlobalConstants.client_secret)
            }
          };
          HttpUtils.asyncRequest(url, requestData, requestConfig, 'POST').then((response) => {
            response.json().then(d => {
              // setToken(d.access_token);
              // setRefreshToken(d.refresh_token);
              // setExpiresTimestamp(new Date().getTime() + Number(d.expires_in)*1000);
            });
          });
        } else {

        }
      }
      this.a.loading = false;
      this.$router.push({path: this.redirect || '/'});
    }).catch((error) => {
      this.a.loading = false;
    });
  };

  export default {
    name: 'Login',
    data: thisData,
    watch: {
      $route: {
        handler: function (route) {
          this.redirect = route.query && route.query.redirect
        },
        immediate: true
      }
    },
    created() {
      // window.addEventListener('hashchange', this.afterQRScan)
    },
    destroyed() {
      // window.removeEventListener('hashchange', this.afterQRScan)
    },
    methods: {
      showPwd() {
        if (this.passwordType === 'password') {
          this.passwordType = 'text';
        } else {
          this.passwordType = 'password';
        }
      },
      handleLogin() {
        this.$refs.loginForm.validate(async valid => {
          if (valid) {
            this.loading = true;
            this.requestToken(this.loginForm.username, this.loginForm.password);
          } else {
            console.log('error submit!!');
            return false
          }
        })
      },
      requestToken: function(_username, _password, _data={}){
        let url = HttpUtils.jointUri(GlobalConstants.AuthServerHost, GlobalConstants.URL_OAUTH_AUTHORIZE);
        let requestData = {
          client_id: GlobalConstants.client_id,
          redirect_uri: GlobalConstants.auth_redirect_uri,
          scope: GlobalConstants.scope,
          response_type: GlobalConstants.response_type,
          ..._data
        };
        let requestConfig = {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + Base64.encode(_username + ":" + _password)
          }
        };
        HttpUtils.asyncRequest(url, requestData, requestConfig).then((response) => {
          if (response.status == 200){
            let _url = response.url;
            let code = HttpUtils.spliteParamsFromUrl(_url).code;
            if (code){
              url = HttpUtils.jointUri(GlobalConstants.AuthServerHost, GlobalConstants.URL_OAUTH_TOKEN);
              requestData = {
                grant_type: GlobalConstants.grant_type,
                code: code,
                redirect_uri: GlobalConstants.auth_redirect_uri
              };
              requestConfig = {
                headers: {
                  'Content-Type': 'application/x-www-form-urlencoded',
                  'Authorization': 'Basic ' + Base64.encode(GlobalConstants.client_id + ":" + GlobalConstants.client_secret)
                }
              };
              HttpUtils.asyncRequest(url, requestData, requestConfig, 'POST').then((response) => {
                response.json().then(d => {
                  setToken(d.access_token);
                  setRefreshToken(d.refresh_token);
                  setExpiresTimestamp(new Date().getTime() + Number(d.expires_in)*1000);
                });
              });
            } else {

            }
          }
          this.loading = false;
          this.$router.push({path: this.redirect || '/'});
        }).catch((error) => {
          this.loading = false;
        });
      },
      afterQRScan() {
        // const hash = window.location.hash.slice(1)
        // const hashObj = getQueryObject(hash)
        // const originUrl = window.location.origin
        // history.replaceState({}, '', originUrl)
        // const codeMap = {
        //   wechat: 'code',
        //   tencent: 'code'
        // }
        // const codeName = hashObj[codeMap[this.auth_type]]
        // if (!codeName) {
        //   alert('第三方登录失败')
        // } else {
        //   this.$store.dispatch('LoginByThirdparty', codeName).then(() => {
        //     this.$router.push({ path: '/' })
        //   })
        // }
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  /* 修复input 背景不协调 和光标变色 */
  /* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

  $bg: #283443;
  $light_gray: #eee;
  $cursor: #fff;

  @supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
    .login-container .el-input input {
      color: $cursor;
      &::first-line {
        color: $light_gray;
      }
    }
  }

  /* reset element-ui css */
  .login-container {
    .el-input {
      display: inline-block;
      height: 47px;
      width: 85%;
      input {
        background: transparent;
        border: 0px;
        -webkit-appearance: none;
        border-radius: 0px;
        padding: 12px 5px 12px 15px;
        color: $light_gray;
        height: 47px;
        caret-color: $cursor;
        &:-webkit-autofill {
          -webkit-box-shadow: 0 0 0px 1000px $bg inset !important;
          -webkit-text-fill-color: $cursor !important;
        }
      }
    }
    .el-form-item {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: #454545;
    }
  }
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
  $bg: #2d3a4b;
  $dark_gray: #889aa4;
  $light_gray: #eee;

  .login-container {
    min-height: 100%;
    width: 100%;
    background-color: $bg;
    overflow: hidden;
    .login-form {
      position: relative;
      width: 520px;
      max-width: 100%;
      padding: 160px 35px 0;
      margin: 0 auto;
      overflow: hidden;
    }
    .tips {
      font-size: 14px;
      color: #fff;
      margin-bottom: 10px;
      span {
        &:first-of-type {
          margin-right: 16px;
        }
      }
    }
    .svg-container {
      padding: 6px 5px 6px 15px;
      color: $dark_gray;
      vertical-align: middle;
      width: 30px;
      display: inline-block;
    }
    .title-container {
      position: relative;
      .title {
        font-size: 26px;
        color: $light_gray;
        margin: 0px auto 40px auto;
        text-align: center;
        font-weight: bold;
      }
      .set-language {
        color: #fff;
        position: absolute;
        top: 5px;
        right: 0px;
      }
    }
    .show-pwd {
      position: absolute;
      right: 10px;
      top: 7px;
      font-size: 16px;
      color: $dark_gray;
      cursor: pointer;
      user-select: none;
    }
    .thirdparty-button {
      position: absolute;
      right: 0;
      bottom: 6px;
    }
  }
</style>
