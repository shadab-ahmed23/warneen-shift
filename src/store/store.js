// src/store.js
import { createStore } from 'vuex';

const store = createStore({
  state: {
    shifts: [],
  },
  mutations: {
    addShift(state, shift) {
      console.log(shift)
      state.shifts.push(shift);
    },
    deleteShift(state, index) {
      state.shifts.splice(index, 1);
    },
  },
});

export default store;
