<script>
  import Vue from 'vue'
  import Vuex from 'vuex';
  Vue.use(Vuex);

  const store = new Vuex.Store({
    state: {
      count: 0,
      todos: [
        { id: 1, text: '任务1', done: true },
        { id: 2, text: '任务2', done: true },
        { id: 3, text: '任务3', done: false }
      ]
    },
    mutations: {
      increment(state) {
        state.count++
      }
    },
    getters: {
      // Getter 接受 state 作为其第一个参数
      doneTodos: state => {
        return state.todos.filter(todo => todo.done)
      },
      // Getter 也可以接受其他 getter 作为第二个参数
      doneTodosCount: (state, getters) => {
        return getters.doneTodos.length
      }
    }
  });

  export default store;
</script>
