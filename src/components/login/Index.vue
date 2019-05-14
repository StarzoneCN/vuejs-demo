<template>
  <div id="main-container">
    <div id="login_div">
      <div id="left_div">
        <div class="img_div">
          <img src="/static/images/logo_03.png"/>
          <p>——— 轻松清洁，优雅生活 ———</p>
        </div>
      </div>
      <div id="right_div">
        <div class="input_div">
          <p>蓝月亮采购中心系统欢迎您</p>
          <div class="div_input">
            <div style="float:left;margin:0 20px 0 20px;">
              <img src="/static/images/user_03.png"/>
            </div>
            <div style="float:left;">
              <input type="text" id="username" class="p_input" placeholder="请输入您的用户名"/>
            </div>
          </div>
          <div class="error_text">
            <span id="userText" class="span-css"></span>
          </div>
          <div class="div_input">
            <div style="float:left;margin:0 20px 0 20px;">
              <img src="/static/images/password_03.png"/>
            </div>
            <div style="float:left;">
              <input type="password" id="password" class="p_input" placeholder="请输入您的密码"/>
            </div>
          </div>
          <div class="error_text">
            <span id="passText" class="span-css"></span>
          </div>
          <div class="div_input">
            <div style="float:left;margin:0 20px 0 20px;">
              <input type="text" id="rand" class="p_input" placeholder="请输入验证码"/>
            </div>
            <div style="float:left;">
              <IMG :src="variCodeUri" border=0 id="safecode" style="width:100px;height:24px;"/>
              <img src="/static/images/icon_refresh.png" style="width:22px;height:22px;" @click="reloadCode">
            </div>
          </div>
          <div class="error_text">
            <span id="randText" class="span-css"></span>
          </div>
          <div class="error_text" style="text-align:right;line-height:15px;height:20px;">
            <a href="javascript:void(0)" @click="resetPass()">忘记密码？</a>
          </div>
          <div>
            <button type="button" class="p_button" @click="onLogin()">登&nbsp;&nbsp;&nbsp;&nbsp;录</button>
          </div>
        </div>
      </div>
    </div>

    <div class="footer">
      <div style="height:50%;padding-top:12px;">
        <ul>
          <a target="view_window" href="http://crm.bluemoon.com.cn">天使APP下载</a>
          <a>|</a>
          <a target="view_window" href="http://www.bluemoon.com.cn">蓝月亮官网</a>
        </ul>
      </div>
      <div style="height:50%;">
        <p>Copyright © 2016 BlueMoon New Buiness Limited All Right Reserved.</p>
      </div>
    </div>

    <div id="maskDiv" style="display:none;"></div>

    <div id="input_verifyCode" style="display:none;">
      <div style="width:100%;height:70px;">
        <div style="padding-top:20px;margin-left:140px;float:left;"><span
          style="font-size:20px;font-family:雅黑;color:#808A87;line-height:20px;">找回密码</span></div>
        <div style="margin-top:10px;margin-left:110px;float:left;"><img src="/static/images/close.png"
                                                                        @click="closeDiv1()"/></div>
      </div>
      <div style="width:100%;height:60px;background-color:#FFFFFF;">
        <input type="text" style="height:59px;width:318px;border:none;margin-left:20px;font-size:18px;" id="empCode"
               maxlength="11" placeholder="请输入员工编码"/>
      </div>
      <div style="width:100%;height:60px;background-color:#FFFFFF;">
        <input type="text" style="height:59px;width:318px;border:none;margin-left:20px;font-size:18px;" id="mobileNo"
               maxlength="11" placeholder="请输入手机号码"/>
      </div>
      <div style="width:100%;height:120px;text-align:center;">
        <button type="button"
                style="background:#ff9a0c;border-style:none;border-radius:8px;color:white;font-size:14px;font-family:微软雅黑;width:150px;height:40px;margin-top:40px;"
                @click="getVerifyCode()">获取验证码
        </button>
      </div>
    </div>

    <div id="reset_passCode" style="display:none;">
      <div style="width:100%;height:70px;">
        <div style="margin-top:10px;margin-left:15px;float:left;"><img src="/static/images/back.png"
                                                                       @click="backDiv1()"/></div>
        <div style="padding-top:20px;margin-left:110px;float:left;"><span
          style="font-size:20px;font-family:雅黑;color:#808A87;line-height:20px;">重置密码</span></div>
        <div style="margin-top:10px;margin-left:110px;float:left;"><img src="/static/images/close.png"
                                                                        @click="closeDiv2()"/></div>
      </div>
      <div style="width:100%;height:60px;background-color:#FFFFFF;">
        <input id="code" type="text" style="height:60px;width:218px;border:none;margin-left:20px;font-size:18px;"
               maxlength="4" placeholder="请输入短信验证码"/>
        <input type="button"
               style="background:none;border:solid 1px blue;border-radius:5px;color:blue;font-size:14px;font-family:楷体;width:85px;height:30px;margin-top:15px;"
               id="verifyCode" @click="getVerifyCode()" value="再次获取"/>
      </div>
      <div style="width:100%;height:60px;background-color:#FFFFFF;">
        <input id="newPassword" type="password"
               style="height:60px;width:318px;border:none;margin-left:20px;font-size:18px;" maxlength="18"
               placeholder="请输入8-18位数字+字母密码"/>
      </div>
      <div style="width:100%;height:60px;background-color:#FFFFFF;">
        <input id="newPassword1" type="password"
               style="height:60px;width:318px;border:none;margin-left:20px;font-size:18px;" maxlength="18"
               placeholder="请再次输入密码"/>
      </div>
      <div style="width:100%;height:120px;text-align:center;">
        <button type="button"
                style="background:#ff9a0c;border-style:none;border-radius:8px;color:white;font-size:14px;font-family:微软雅黑;width:150px;height:40px;margin-top:40px;"
                @click="savePass()">提&nbsp;&nbsp;&nbsp;&nbsp;交
        </button>
      </div>
    </div>
  </div>
</template>

<script>
  import '@/components/login/Login.css'
  import {varificationCodeUri} from '@/constant/UriConstants'

  export default {
    name: "login-page",
    data() {
      return {
        varificationCodeBaseUri: varificationCodeUri,
        uriRandomStr: ''
      }
    },
    methods: {
      reloadCode() {
        console.log("fdsafdsa")
        this.uriRandomStr = Math.random().toString(36).substr(2);
      }
    },
    computed: {
      variCodeUri: function () {
        return this.varificationCodeBaseUri + '?' + this.uriRandomStr;
      }
    }
  }
</script>

<style scoped>
</style>
