<template>
  <div id="app">
    <AddShifts />
    <!-- <div v-for="(shift, index) in shiftCards" :key="index">
      <ShiftsCard :shift="shift" :index="index" />
    </div> -->
  </div>
</template>

<script>
/* eslint-disable vue/no-unused-components */
import AddShifts from './components/AddShifts.vue';
import ShiftsCard from './components/ShiftsCard.vue';

export default {
  components: {
    AddShifts,
    ShiftsCard,
  },
  computed: {
    shiftCards() {
      return this.$store.state.shifts.shiftCards;
    },
  },
};
</script>
