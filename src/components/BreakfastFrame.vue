<template>
  <div>
    <h4>今天都吃了什么呀?</h4>
    <router-view class="view1"></router-view>
    <router-view class="view2" name="potato"></router-view>
    <router-view class="view3" name="tomato"></router-view>
  </div>
</template>

<script>
    export default {
        name: "breakfast-frame"
    }
</script>

<style scoped>
.view-two {
  height: 500px;
}
</style>
