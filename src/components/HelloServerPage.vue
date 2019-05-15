<template>
  <div>
    <el-button type="primary" @click="sayHi">主要按钮</el-button>
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
        ReqUtils.get('/', {
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
