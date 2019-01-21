<template>
  <div>
    <el-button type="primary" @click="incrementCount">主要按钮</el-button><br/>
    <span>{{count}}</span>
  </div>
</template>

<script>
  let _data = function () {
    return {
      count: this.$store.state.count
    }
  };

  export default {
    name: "index",
    data: _data,
    methods: {
      incrementCount: function () {
        this.$store.commit('increment');
        this.count = this.$store.state.count;
      }
    }
  }
</script>

<style scoped>

</style>
