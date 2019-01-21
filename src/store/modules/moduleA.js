const moduleA = {
  namespaced: true,
  state: {
    countA: 20
  },
  mutations: {
    incrementA(state) {
      state.countA++
    }
  },
  getters: {

  }
};

export default moduleA;
