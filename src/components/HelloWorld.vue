<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>Essential Links</h2>
    <ul>
      <li>
        <a
          href="https://vuejs.org"
          target="_blank"
        >
          Core Docs
        </a>
      </li>
      <li>
        <a
          href="https://forum.vuejs.org"
          target="_blank"
        >
          Forum
        </a>
      </li>
      <li>
        <a
          href="https://chat.vuejs.org"
          target="_blank"
        >
          Community Chat
        </a>
      </li>
      <li>
        <a
          href="https://twitter.com/vuejs"
          target="_blank"
        >
          Twitter
        </a>
      </li>
      <br>
      <li>
        <a
          href="http://vuejs-templates.github.io/webpack/"
          target="_blank"
        >
          Docs for This Template
        </a>
      </li>
    </ul>
    <h2>Ecosystem</h2>
    <ul>
      <li>
        <a
          href="http://router.vuejs.org/"
          target="_blank"
        >
          vue-router
        </a>
      </li>
      <li>
        <a
          href="http://vuex.vuejs.org/"
          target="_blank"
        >
          vuex
        </a>
      </li>
      <li>
        <a
          href="http://vue-loader.vuejs.org/"
          target="_blank"
        >
          vue-loader
        </a>
      </li>
      <li>
        <a
          href="https://github.com/vuejs/awesome-vue"
          target="_blank"
        >
          awesome-vue
        </a>
      </li>
    </ul>

    <h2>Custom Links</h2>
    <ul>
      <li>
        <router-link to="/at/HelloWorld">Show Animal</router-link>
      </li>
      <li>
        <a href="javascript:;" @click="linkTo('/bf', {id: 10})" target="_self"><u>Router.push to Breakfast</u></a>
      </li>
      <li>
        <a href="javascript:;" @click="linkToByName('breakfast', {id: 10})" target="_self"><u>Router.push to Breakfast
          by name</u></a>
      </li>
      <br>
      <li>
        <a href="javascript:;" @click="linkTo('/media')" target="_self"><u>Media</u></a>
      </li>
      <li>
        <a href="javascript:;" @click="linkTo('/bf/frame')" target="_self"><u>Router.push to BreakfastFrame</u></a>
      </li>
    </ul>

    <h2>Element UI</h2>
    <ul>
      <li>
        <a href="javascript:;" @click="linkTo('/el/4')" target="_self"><u>Index</u></a>
      </li>
      <li>
        <a href="javascript:;" @click="linkTo('/el/1')" target="_self"><u>Index1</u></a>
      </li>
      <li>
        <a href="javascript:;" @click="linkTo('/el/3')" target="_self"><u>Basic1+2</u></a>
      </li>
      <li>
        <a href="javascript:;" @click="linkTo('/ele/testPage')" target="_self"><u>TestPage</u></a>
      </li>
    </ul>

    <h2>iView UI</h2>
    <ul>
      <li>
        <a href="javascript:;" @click="linkTo('/iview')" target="_self"><u>Index</u></a>
      </li>
    </ul>

    <h2>Vuex</h2>
    <ul>
      <li>
        <a href="javascript:;" @click="linkTo('/vuex')" target="_self"><u>Index</u></a>
      </li>
    </ul>

    <h2>User Manage</h2>
    <ul>
      <li>
        <a href="javascript:;" @click="linkTo('/user')" target="_self"><u>Index</u></a>
      </li>
    </ul>

    <h2>Others</h2>
    <ul>
      <li>
        <a href="javascript:;" @click="linkTo('/tp')" target="_self"><u>TestPage</u></a>
      </li>
    </ul>
  </div>
</template>

<script>
  import testPage from './TestPage'

  export default {
    name: 'HelloWorld',
    data() {
      return {
        msg: 'Welcome to Your Vue.js App'
      }
    },
    methods: {
      linkTo: function (path, query) {
        this.$router.push({path: path, query: query})
      },
      linkToByName: function (name, params) {
        this.$router.push({name: name, params: params})
      }
    },
    components: {
      testPage: testPage
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1, h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }

  .router-link-active {
    color: red;
  }
</style>
