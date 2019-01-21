<template>
  <div>
    这是一个测试页
    <p>{{_globalConstans.globalData0}}</p>
    测试一下过滤器
    <p>{{ newDate | getDate}}</p>
  </div>
</template>

<script>
  import Vue from 'vue';
  let getDate = function (_d) {
    return _d.getDate();
  };

  Vue.filter("getDate", getDate);
  export default {
    name: "test-page",
    data: function () {
      return {
        newDate: new Date()
      }
    },
    methods: {
    }
  }
</script>

<style scoped>

</style>
