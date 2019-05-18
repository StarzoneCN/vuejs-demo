<template>
  <div>
    <el-button type="primary" @click="sayHi">
      <i class="fa fa-user-o" aria-hidden="true"></i>用户
    </el-button>
    <p>{{sayHiRespones}}</p>
  </div>
</template>

<script>
  /* eslint-disable */
  import ReqUtils from '@/util/RequestUtils'

  export default {
    name: "HelloServerPage",
    data() {
      return {
        sayHiRespones: ''
      }
    },
    methods: {
      sayHi() {
        ReqUtils.get('/user/10', {
          headers: {
            contentType: 'application/json'
          }
        }).then((resp) => {
          this.sayHiRespones = resp.data;
        })
      }
    }
  }
</script>

<style scoped>

</style>
