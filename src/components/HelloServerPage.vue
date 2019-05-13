<template>
  <div>
    <el-button type="primary" @click="sayHi">主要按钮</el-button>
    <p>{{sayHiRespones}}</p>
  </div>
</template>

<script>
  /* eslint-disable */
  import axios from 'axios';

  export default {
    name: "HelloServerPage",
    data() {
      return {
        sayHiRespones: ''
      }
    },
    methods: {
      sayHi() {
        axios.get('/helloServer', {
          headers: {
            contentType: 'application/json'
          }
        }).then((resp) => {
          this.sayHiRespones = resp.data;
        }).catch((err) => {
          if (err.response.status == 401) {
            top.location = 'http://angelapi.bluemoon.com.cn/portal-admin/login.html';
          }
        })
      }
    }
  }
</script>

<style scoped>

</style>
