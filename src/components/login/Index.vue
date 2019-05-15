<template>
  <div id="main-container">
    <div id="login_div" v-if="loginPage">
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
              <input type="text" id="username" class="p_input" placeholder="请输入您的用户名" @keyup="varifiCodeInputKeyup"/>
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
              <input type="password" id="password" class="p_input" placeholder="请输入您的密码" @keyup="varifiCodeInputKeyup"/>
            </div>
          </div>
          <div class="error_text">
            <span id="passText" class="span-css"></span>
          </div>
          <div class="div_input">
            <div style="float:left;margin:0 20px 0 20px;">
              <input type="text" id="rand" class="p_input" placeholder="请输入验证码" @keyup="varifiCodeInputKeyup"/>
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
            <a href="javascript:void(0)" @click="resetPass">忘记密码？</a>
          </div>
          <div>
            <button type="button" class="p_button" @click="login">登&nbsp;&nbsp;&nbsp;&nbsp;录</button>
          </div>
        </div>
      </div>
    </div>

    <div class="footer" v-if="loginPage">
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

    <div id="maskDiv" v-if="resetPassPage"></div>

    <div id="input_verifyCode" v-if="resetPassPage">
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

    <div id="reset_passCode" v-if="resetPassPage">
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
  import RequestUtils from '@/util/RequestUtils'
  import {hex_md5} from '@/util/md5_32'

  export default {
    name: "login-page",
    data() {
      return {
        varificationCodeBaseUri: varificationCodeUri,
        uriRandomStr: '',
        loginPage: true
      }
    },
    methods: {
      /**
       * 重新加载验证码
       */
      reloadCode() {
        console.log("fdsafdsa")
        this.uriRandomStr = Math.random().toString(36).substr(2);
      },

      /**
       * 进入重置密码界面
       */
      resetPass() {
        this.loginPage = false;
      },

      /**
       * 登录时，输入框内enter键盘触发
       * @param event
       */
      varifiCodeInputKeyup(event){
        if (event.keyCode === 13) {
          console.log('登录 。。。 ')
        }
      },

      /**
       * 点击登录按钮
       */
      login(){
        var flag = this.dataValidate();
        if(flag == "" || flag == null ){
          var username = document.getElementById("username").value;
          var password = document.getElementById("password").value;
          password = hex_md5(password);
          var rand = document.getElementById("rand").value;
          var params= {account:username,password:password,rand:rand};
          RequestUtils.post('/auth/login', params).then((resp) => {
            console.log(resp);
          })
        }
      },

      /**
       * 验证数据登录数据有效性
       * @returns {string}
       */
      dataValidate(){
        document.getElementById("userText").innerHTML = "";
        document.getElementById("passText").innerHTML = "";
        document.getElementById("randText").innerHTML = "";
        var flag = "";
        var username = document.getElementById("username").value;
        var password = document.getElementById("password").value;
        var rand = document.getElementById("rand").value;

        if(username == "" || username == null ){
          flag = "用户名不能为空";
          document.getElementById("userText").innerHTML = flag;
        }
        if( password == "" || password == null ){
          flag = "密码不能为空";
          document.getElementById("passText").innerHTML = flag;
        }else{
          var re = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,18}$/;
          if( !re.test(password) ){
            flag = "密码必须由8-18位数字和字母组合";
            document.getElementById("passText").innerHTML = flag;
          }
        }
        if(rand == "" || rand == null ){
          flag = "验证码不能为空";
          document.getElementById("randText").innerHTML = flag;
        }

        return flag;
      }
    },
    computed: {
      variCodeUri: function () {
        return this.varificationCodeBaseUri + '?' + this.uriRandomStr;
      },
      resetPassPage: function () {
        return !this.loginPage;
      }
    }
  }
</script>

<style scoped>
</style>
