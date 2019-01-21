<template>
  <div>
    <el-button type="primary" @click="incrementBy(2)">主要按钮</el-button><br/>
    <span>{{count}}</span>
    已经完成的任务{{doneTodosCount}}
  </div>
</template>

<script>
  // 在单独构建的版本中辅助函数为 Vuex.mapState
  import { mapState, mapGetters, mapMutations } from 'vuex'

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
      },
      ...mapMutations([
        'increment', // 将 `this.increment()` 映射为 `this.$store.commit('increment')`

        // `mapMutations` 也支持载荷：
        'incrementBy' // 将 `this.incrementBy(amount)` 映射为 `this.$store.commit('incrementBy', amount)`
      ]),
      ...mapMutations({
        add: 'increment' // 将 `this.add()` 映射为 `this.$store.commit('increment')`
      })
    },
    computed: {
      localComputed () {
        // 当前组件的其他运算属性
      },
      // 使用对象展开运算符将此对象混入到外部对象中
      ...mapState([
        'count'
      ]),
      // 使用对象展开运算符将 getter 混入 computed 对象中
      ...mapGetters([
        'doneTodosCount'
        // 'anotherGetter',
        // ...
      ])
    }
  }
</script>

<style scoped>

</style>
