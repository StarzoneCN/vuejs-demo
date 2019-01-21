<template>
  <div>
    <h2>This is the test page of iView</h2>
    <IvSlider v-model="value" range/>
    <AnimalTest></AnimalTest>
  </div>
</template>

<script>
  import AnimalTest from '@/components/AnimalTest'

  export default {
    name: "index",
    data: function () {
      return {
        value: [20, 50]
      }
    },
    components: {
      'animalTest': AnimalTest
    }
  }
</script>

<style scoped>

</style>
