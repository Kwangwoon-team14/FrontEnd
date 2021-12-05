import Vuex from "vuex";

export default new Vuex.Store({
  state: {
    user: {},
    reservation: {},
  },
  mutations: {
    update(state, data) {
      Object.keys(data).forEach((key) => {
        state.user[key] = data[key];
      });
    },

    reservationUpdate(state, data) {
      state.reservation = data;
    },

    reservationRemove(state) {
      state.reservation = {};
    },
  },
});
