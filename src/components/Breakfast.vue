<template>
    <div>
      <h4>Have a better and little breakfast</h4>
      <span>
        <p>The query is {{$route.query}}</p>
        <p>The params is {{$route.params}}</p>
      </span><br><br>
      <router-link to="/bf/foods">What foods you eat?</router-link>
    </div>
</template>

<script>
export default {
  name: 'breakfast'
}
</script>

<style scoped>

</style>
