<template>
  <div class="shift-card">
    <div class="container">
      <div class="row">
        <div class="col-md-6 offset-md-3">
          <div class="card">
            <div class="card-header">
              {{ shift.title }}

              <div class="d-flex justify-content-between align-items-center">
                <span class="delete-button mr-5" @click="deleteShift(index)">
                  <i class="bi bi-x mr-5"></i>
                </span>
                <span class="ml-2" @click="editShift(index)">
                  <i class="bi bi-pencil"></i>
                </span>
              </div>
            </div>

            <div class="card-body">
              <p class="card-text">{{ shift.description }}</p>
              <div class="details">
                <div v-for="card in shift.cards" :key="card.price">
                  <ul class="list-unstyled">
                    <li class="bg-black text-white px-3 rounded">
                      <span>{{ card.title }}</span>
                      <span>{{ card.startTime }}</span>
                      <span>{{ card.endTime }}</span>
                      <span>{{ card.type }}</span>
                      <span>{{ card.price }}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["shift", "index"],
  data() {
    return {
      selectedPrice: 0,
    };
  },
 
  methods: {
    deleteShift(index) {
      this.$store.commit("deleteShift", index);
    },
    editShift() {
      this.$emit("edit", this.index);
    },
  },
};
</script>

<style scoped>
.shift-card {
  /* border: 1px solid #ccc; */
  margin: 10px;
  padding: 10px;
  border-radius: 5px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.delete-button {
  background: none;
  border: none;
  color: red;
  cursor: pointer;
}
.details li {
  padding: 5px 0;
  border-bottom: 1px solid #ccc;
  list-style-type: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
