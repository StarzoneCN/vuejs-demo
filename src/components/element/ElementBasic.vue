<template>
  <fieldset style="margin: 0px 25% 0px 25%;">
    <legend>Basic-{{elementNo}}</legend>
    <h1>Element</h1>
    <el-button type="primary" round>默认按钮</el-button>
    <input type="text" v-model="programmerName" value=""/>
    <p>{{sayHi}}</p>
  </fieldset>
</template>

<script>
  var _data = function () {
    return {
      programmerName: 'Tom'
    }
  }

  export default {
    name: "element-basic",
    data: _data,
    methods: {
      printParent: () => console.log(this)
    },
    computed: {
      sayHi: function () {
        return 'Ni hao， ' + this.programmerName + ' , I\' star!';
      }
    },
    props: {
      elementNo: {
        type: Number,
        validator: function (value) {
          console.log('value is ' + value)
          return true
        }
      }
    }
  }
</script>

<style scoped>

</style>
