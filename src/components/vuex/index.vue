<template>
  <div>
    <el-button type="primary" @click="incrementCount">主要按钮</el-button><br/>
    <span>{{count}}</span>
  </div>
</template>

<script>
  // 在单独构建的版本中辅助函数为 Vuex.mapState
  import { mapState } from 'vuex'

  let _data = function () {
    return {
    }
  };

  export default {
    name: "index",
    data: _data,
    methods: {
      incrementCount: function () {
        this.$store.commit('increment');
      }
    },
    computed: mapState({
      count: 'count' // 如果有多个计算属性与state中的key相同，这里可以使用数组
    })
  }
</script>

<style scoped>

</style>
