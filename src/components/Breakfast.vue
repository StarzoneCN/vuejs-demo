<template>
    <div>
      <h4>Have a better and little breakfast</h4>
      <span>
        <p>The query is {{$route.query}}</p>
        <p>The params is {{$route.params}}</p>
      </span><br><br>
      <p>
        听说你{{datee}}号是在{{time}}吃的早饭(id={{id}}）
      </p>
      <router-link to="/bf/foods">What foods you eat?</router-link>
    </div>
</template>

<script>
export default {
  name: 'breakfast',
  props: ['id', 'datee', 'time']
}
</script>

<style scoped>

</style>
