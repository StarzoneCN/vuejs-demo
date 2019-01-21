<template>
  <div>
    <el-button type="primary" @click="incrementCount">主要按钮</el-button><br/>
    <span>{{count}}</span>
    已经完成的任务{{doneTodosCount}}
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
    computed: {
      localComputed () {
        // 当前组件的其他运算属性
      },
      doneTodosCount(){
        return this.$store.getters.doneTodosCount;
      },
      // 使用对象展开运算符将此对象混入到外部对象中
      ...mapState([
        'count'
      ])
    }
  }
</script>

<style scoped>

</style>
