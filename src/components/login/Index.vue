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
              <input type="text" id="username" class="p_input" placeholder="请输入您的用户名" @keyup="tapEnter2login"/>
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
              <input type="password" id="password" class="p_input" placeholder="请输入您的密码" @keyup="tapEnter2login"/>
            </div>
          </div>
          <div class="error_text">
            <span id="passText" class="span-css"></span>
          </div>
          <div class="div_input">
            <div style="float:left;margin:0 20px 0 20px;">
              <input type="text" id="rand" class="p_input" placeholder="请输入验证码" @keyup="tapEnter2login"/>
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
      <div style="height:50%;">
        <ul style="line-height: 30px;">
          <a target="view_window" href="http://crm.bluemoon.com.cn">天使APP下载</a>
          <a>|</a>
          <a target="view_window" href="http://www.bluemoon.com.cn">蓝月亮官网</a>
        </ul>
      </div>
      <div style="height:50%;">
        <p>Copyright © 2016 BlueMoon New Buiness Limited All Right Reserved.</p>
      </div>
    </div>

    <div id="maskDiv" v-if="accountInfoDialog"></div>

    <el-dialog :visible="accountInfoDialog" @close="closeAccountInfoDialog" custom-class="input_verifyCode"
               title="找回密码" width="360px">
      <el-form :model="accountInfo" ref="accountInfoForm" label-width="0" class="accountInfo-form">
        <el-form-item prop="account" :rules="accountFormRules.accountRules">
          <el-input id="account" v-model="accountInfo.account" placeholder="请输入员工编号" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="mobileNo" :rules="accountFormRules.mobileNoRules">
          <el-input id="mobileNo" v-model="accountInfo.mobileNo" placeholder="请输入手机号码" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div style="width:100%;height:120px;text-align:center;">
        <button type="button" style="background:#ff9a0c;border-style:none;border-radius:8px;color:white;font-size:14px;
            font-family:微软雅黑;width:150px;height:40px;margin-top:10px;" @click="getVerifyCode">
          获取验证码
        </button>
      </div>
    </el-dialog>

    <!--<div id="reset_passCode" v-if="resetDialog">-->
    <el-dialog :visible="resetDialog" @close="closeResetDialog" custom-class="reset_passCode"
               title="重置密码" width="360px">
      <div slot="title" style="width:100%;">
        <div style="float:left;">
          <img style="margin-top: 0px;" src="/static/images/back.png" @click="back2accountInfoDialog"/>
        </div>
        <span style="line-height: 24px;font-size: 18px;color: #303133;">重置密码&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
      </div>
      <el-form :model="resetPassForm" ref="resetPassForm" label-width="0" class="reset-pass-form">
        <el-form-item prop="verifyCode" :rules="resetPassFormRules.verifyCodeRules">
          <el-input id="verifyCode" v-model="resetPassForm.verifyCode" placeholder="请输入短信验证码" style="display: inline;" autocomplete="off"></el-input>
          <input type="button" :disabled="canReGetVerifyCode"
                 style="background:none;border:solid 1px blue;border-radius:5px;color:blue;font-size:14px;font-family:楷体;width:85px;height:30px;margin-top:15px;"
                 id="verifyCodeButton" @click="getVerifyCode" :value="reGetVerifyCodeButtonValue"/>
        </el-form-item>
        <el-form-item prop="newPass" :rules="resetPassFormRules.newPassRules">
          <el-input id="newPass" type="password" v-model="resetPassForm.newPass" placeholder="请输入8-18位数字+字母密码" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="newPassRepeat" :rules="resetPassFormRules.newPassRepeatRules">
          <el-input id="newPassRepeat" type="password" v-model="resetPassForm.newPassRepeat" placeholder="请再次输入密码" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div style="width:100%;text-align:center;">
        <button type="button"
                style="background:#ff9a0c;border-style:none;border-radius:8px;color:white;font-size:14px;font-family:微软雅黑;width:150px;height:40px;margin-top:20px;"
                @click="savePass">提&nbsp;&nbsp;&nbsp;&nbsp;交
        </button>
      </div>
    </el-dialog>
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
        loginPage: true,
        accountInfoDialog: false,
        resetDialog: false,
        accountInfo: {
          account: '80486943',
          mobileNo: '13427684687'
        },
        resetPassForm: {
          verifyCode: '',
          newPass: '',
          newPassRepeat: ''
        },
        accountFormRules: {
          accountRules: [
            { required: true, pattern: /^[0-9A-Za-z]{1,11}$/, message: '请输入正确的员工编号', trigger: 'blur'}
          ],
          mobileNoRules: [
            { required: true, pattern: /^1[34578]\d{9}$/,  message: '请输入正确手机号码', trigger: 'blur'}
          ]
        },
        resetPassFormRules: {
          verifyCodeRules: [
            { required: true, message: '请输入短信验证码', trigger: 'blur'}
          ],
          newPassRules: [
            { required: true, pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,18}$/,  message: '密码不能为空，且必须是8-18位数字和字母组合', trigger: 'blur'}
          ],
          newPassRepeatRules: [
            {validator: this.newPassRepeatValidator, trigger: 'blur'}
          ]
        },
        countDown: 0
      }
    },
    computed: {
      variCodeUri: function () {
        return this.varificationCodeBaseUri + '?' + this.uriRandomStr;
      },
      canReGetVerifyCode: function () {
        return this.countDown <= 0;
      },
      reGetVerifyCodeButtonValue: function () {
        return this.countDown <= 0 ? '再次获取' : '（' + this.countDown + '）秒';
      }
    },
    methods: {
      newPassRepeatValidator(rule, value, callback) {
        if (!value || !value.trim()) {
          callback(new Error('请再次输入密码'));
        }else if (this.resetPassForm.newPassRepeat != this.resetPassForm.newPass) {
          callback(new Error('两次输入密码不一致'));
        } else {
          callback();
        }
      },
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
        this.accountInfoDialog = true;
      },

      /**
       * 登录时，输入框内enter键盘触发
       * @param event
       */
      tapEnter2login(event){
        if (event.keyCode === 13) {
          this.login();
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
          var rand = document.getElementById("rand").value;
          password = hex_md5(password);
          var params= {account:username,password:password,rand:rand};
          RequestUtils.post('/auth/login', params).then((resp) => {
            if (resp.data.code == 0) {
              this.$router.push({
                path: '/'
              });
            } else {
              this.$message({
                message: resp.data.msg,
                type: 'error',
                customClass: 'eleUiMessageClass'
              });
            }
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
      },

      closeAccountInfoDialog(){
        this.accountInfoDialog = false;
      },

      closeResetDialog(){
        this.resetDialog = false;
      },

      back2accountInfoDialog(){
        this.accountInfoDialog = true;
        this.resetDialog = false;
      },

      /**
       * 重置密码 》 获取验证码
       */
      getVerifyCode(){
        this.$refs.accountInfoForm.validate(valid => {
          if (!valid){
            return false;
          }
        });
        const params = Object.assign({}, this.$refs.accountInfoForm.model);
        RequestUtils.post('/auth/getVerifyCode', params).then((resp) => {
          if (resp.data.code == 0) {
            /*验证码发送成功*/
            this.reloadCode();
            this.accountInfoDialog = false;
            this.resetDialog = true;
            this.setTimeAndCountDown(resp.data.data);
          }else{
            this.$message({
              message: resp.data.msg,
              type: 'error'
            });
          }
        });
      },

      /*倒计时*/
      setTimeAndCountDown(_time){
        const _timeNumber = Number(_time);
        if (!isNaN(_timeNumber) && _timeNumber > 0) {
          this.countDown = _timeNumber;
          let timeCountDownInterval = setInterval(() => {
            this.countDown-- ;
            const _cct = this.countDown;
            if (_cct <= 0) {
              clearInterval(timeCountDownInterval);
            }
          }, 1000);
        }else {
          console.error('倒计时必须是数字，且是正数')
        }
      },

      savePass(){
        this.$refs.resetPassForm.validate(valid => {
          if (!valid){
            return false;
          }
        });
        let resetPassFormMode = this.$refs.resetPassForm.model;
        const params = {
          mobileNO: this.accountInfo.mobileNo,
          verifyCode: resetPassFormMode.verifyCode,
          newPassword: hex_md5(resetPassFormMode.newPass)
        };
        RequestUtils.post('/auth/resetPass', params).then((resp) => {
          if (resp.data.code == 0) {
            /*验证码发送成功*/
            this.resetDialog = false;
            this.accountInfo = {
              account: '80486943',
              mobileNo: '13427684687'
            };
            this.resetPassForm = {
              verifyCode: '',
              newPass: '',
              newPassRepeat: ''
            }

            document.getElementById("username").value = '';
            document.getElementById("password").value = '';
            document.getElementById("rand").value = '';
          }else{
            this.$message({
              message: resp.data.msg,
              type: 'error',
              customClass: 'eleUiMessageClass'
            });
          }
        });
      }
    }
  }
</script>

<style scoped>
</style>
