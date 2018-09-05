<template>
    <div>
      <h1>This is the Element index page!</h1>
      <router-view v-if="showFlag == 1 || showFlag == 3" :elementNo="no1"></router-view>
      <router-view v-if="showFlag == 2 || showFlag == 3" name="basic2" :elementNo="no2"></router-view>
    </div>
</template>

<script>
  export default {
    name: "element-index",
    data: function () {
      return {
        no1: 1,
        no2: 2
      }
    },
    props: ['showFlag']
  }
</script>

<style scoped>

</style>
