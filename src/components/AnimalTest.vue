<template>
  <div>
    <p @click="showRouteAndRouter">Animal test - 动画测试</p>
    <button v-on:click="show = !show">Toggle</button>
    <transition name="fade">
      <p v-if="show">hello</p>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'animal-test',
  data: function () {
    return {
      show: true
    }
  },
  methods: {
    showRouteAndRouter: function () {
      this.showRoute()
      this.showRouter()
    },
    showRoute: function () {
      console.log(this.$route)
    },
    showRouter: function () {
      console.log(this.$router)
    },
    showRouteParams: function () {
      console.log(this.$route.params)
    }
  }
}
</script>

<style scoped>
  .fade-enter-active, .fade-leave-active {
    transition: opacity 2s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
</style>
