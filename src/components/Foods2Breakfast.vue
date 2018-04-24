<template>
  <div>
    <a href="javascript:;" @click="backToIndex">Back to index</a><br>
    <p>{{$route.fullPath}}</p>
  </div>
</template>

<script>

  export default {
    name: "foods2-breakfast",
    methods: {
      backToIndex: function () {
        this.$router.go(-2)
      }
    }
  }
</script>

<style scoped>

</style>
