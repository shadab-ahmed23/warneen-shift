<template>
  <div class="hello">
    <div class="viewShifts">
      <div class="container mt-5 px-5">
        <div class="row">
          <div class="col-md-2"></div>
          <div class="col-md-8">
            <div
              class="d-flex justify-content-between titleHeader setUnderline"
            >
              <h4>Filter</h4>
            </div>
            <div class="mx-5 d-flex justify-content-evenly">
              <label for="priceRange" class="form-label"
                >Filter on Price:</label
              >
              {{ selectedPrice }}
              <input
                type="range"
                class="form-range range-input mx-5"
                id="priceRange"
                :min="0"
                :max="maxPrice"
                v-model="selectedPrice"
                style="width: 50%"
              />
              <!-- @change="filteredShifts" -->
            </div>
          </div>
        </div>
        <div class="row mt-5">
          <div class="col-md-2"></div>
          <div class="col-md-8">
            <div
              class="d-flex justify-content-between titleHeader setUnderline"
            >
              <h4>Shifts</h4>
              <button
                class="btn btn-primary bg-dark"
                @click="showSlider = true"
              >
                ADD SHIFT
              </button>
            </div>
          </div>
          <div class="col-md-2"></div>
        </div>
      </div>
    </div>

    <transition name="slide">
      <div v-if="showSlider" class="slider">
        <div
          class="slider-content p-4 rounded test bg-white shadow overflow-auto"
          style="height: 710px"
        >
          <h4 class="mb-4">Create / Edit</h4>
          <div class="mb-3">
            <label for="title" class="form-label">Title:</label>
            <input
              v-model="newShift.title"
              type="text"
              class="form-control"
              :class="{ 'is-invalid': titleError && showSaveClicked }"
              id="title"
              @input="validateTitle"
            />
            <div class="invalid-feedback" v-if="titleError && showSaveClicked">
              {{ titleError }}
            </div>
          </div>
          <div class="mb-3">
            <label for="description" class="form-label">Description:</label>
            <input
              v-model="newShift.description"
              type="text"
              class="form-control"
              id="description"
              :class="{ 'is-invalid': descriptionError }"
              @input="validateDescription"
            />
            <div class="invalid-feedback" v-if="descriptionError">
              {{ descriptionError }}
            </div>
          </div>
          <div class="mb-3">
            <label for="dates" class="form-label">Dates:</label>
            <input
              v-model="selectedDate"
              type="date"
              class="form-control"
              id="dates"
              @change="addShiftCard"
              :class="{ 'is-invalid': datesError && showSaveClicked }"
            />
            <div class="invalid-feedback" v-if="datesError && showSaveClicked">
              {{ datesError }}
            </div>
          </div>

          <!-- cards -->
          <div>
            <div
              v-for="(card, index) in newShift.cards"
              :key="index"
              class="shift-card bg-dark text-white p-3 rounded mt-3"
            >
              <div class="d-flex justify-content-between">
                <h4 class="mb-3">{{ card.title }}</h4>
                <span
                  class="text-danger closeIcon"
                  @click="removeShiftCard(index)"
                  >X</span
                >
              </div>
              <div class="row">
                <div class="col-md-4 mb-3">
                  <label for="startTime">Start Time</label>
                  <input
                    v-model="card.startTime"
                    type="time"
                    class="form-control"
                    id="startTime"
                    :class="{
                      'is-invalid': card.startTimeError && showSaveClicked,
                    }"
                  />
                  <div
                    class="invalid-feedback"
                    v-if="card.startTimeError && showSaveClicked"
                  >
                    {{ card.startTimeError }}
                  </div>
                </div>
                <div class="col-md-4 mb-3">
                  <label for="endTime">End Time</label>
                  <input
                    v-model="card.endTime"
                    type="time"
                    class="form-control"
                    id="endTime"
                    :class="{
                      'is-invalid': card.endTimeError && showSaveClicked,
                    }"
                  />
                  <div
                    class="invalid-feedback"
                    v-if="card.endTimeError && showSaveClicked"
                  >
                    {{ card.endTimeError }}
                  </div>
                </div>
                <div class="col-md-4 mb-3">
                  <label for="price">Price</label>
                  <input
                    v-model="card.price"
                    type="text"
                    class="form-control"
                    id="price"
                    :class="{
                      'is-invalid': card.priceError && showSaveClicked,
                    }"
                  />
                  <div
                    class="invalid-feedback"
                    v-if="card.priceError && showSaveClicked"
                  >
                    {{ card.priceError }}
                  </div>
                </div>
              </div>
              <div class="mb-3">
                <label for="type">Type:</label>
                <select
                  v-model="card.type"
                  class="form-select"
                  :class="{ 'is-invalid': card.typeError && showSaveClicked }"
                  id="type"
                >
                  <option value="Consultation">Consultation</option>
                  <option value="Telephone">Telephone</option>
                  <option value="Ambulance">Ambulance</option>
                </select>
                <div
                  class="invalid-feedback"
                  v-if="card.typeError && showSaveClicked"
                >
                  {{ card.typeError }}
                </div>
              </div>
            </div>
          </div>
          <div class="d-flex justify-content-evenly">
            <button class="btn btn-success mt-3" @click="saveShifts">
              Save
            </button>
            <button class="btn btn-secondary mt-3" @click="clearSlider">
              Delete
            </button>
          </div>
        </div>
      </div>
    </transition>
    <div class="mt-4">
      <template v-if="filteredShifts.length === 0">
        <div class="container mt-5">
          <div class="row justify-content-center">
            <div class="col-md-6">
              <div class="card cardContainer">
                <div class="card-body carChild">
                  <div class="clsAl">
                    <h3>No Shift allocated. Please Add Shifts</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>

      <ShiftsCard
        v-for="(shift, index) in filteredShifts"
        :key="index"
        :shift="shift"
        :index="index"
        @edit="editShift"
      />
    </div>
  </div>
</template>

<script>
import ShiftsCard from "./ShiftsCard.vue";

export default {
  components: {
    ShiftsCard,
  },
  data() {
    return {
      showSlider: false,
      titleError: "",
      descriptionError: "",
      datesError: "",
      selectedPrice: 0,
      showSaveClicked: false,
      editingShiftIndex: null,
      newShift: {
        title: "",
        description: "",
        cards: [],
      },
      selectedDate: "",
      shifts: this.$store.state.shifts,
    };
  },
  computed: {
    maxPrice() {
      let maxPrice = 0;

      this.shifts.forEach((shift) => {
        shift.cards.forEach((card) => {
          const cardPrice = parseInt(card.price);
          if (cardPrice > maxPrice) {
            maxPrice = cardPrice;
          }
        });
      });

      return maxPrice;
    },
    filteredShifts() {
      if (this.selectedPrice === 0) {
        return this.shifts;
      } else {
        return this.shifts
          .map((shift) => {
            const filteredCards = shift.cards.filter(
              (card) => parseInt(card.price) <= this.selectedPrice
            );

            if (filteredCards.length > 0) {
              return {
                ...shift,
                cards: filteredCards,
              };
            } else {
              return null;
            }
          })
          .filter((shift) => shift !== null);
      }
    },
  },
  methods: {
    validateTitle() {
      this.titleError = "";
      if (!this.newShift.title) {
        this.titleError = "Title is required.";
      } else if (this.newShift.title.length > 100) {
        this.titleError = "Title cannot exceed 100 characters.";
      }
    },
    validateDates() {
      this.datesError = "";
      if (!this.selectedDate) {
        this.datesError = "At least one date must be selected.";
      }
    },
    validateDescription() {
      this.descriptionError = "";
      if (this.newShift.description.length > 500) {
        this.descriptionError = "Description cannot exceed 500 characters.";
      }
    },
    validateCard(card) {
      card.startTimeError = "";
      card.endTimeError = "";
      card.priceError = "";
      card.typeError = "";

      if (!card.startTime) {
        card.startTimeError = "Start time is required.";
      }

      if (!card.endTime) {
        card.endTimeError = "End time is required.";
      } else if (card.startTime && card.endTime <= card.startTime) {
        card.endTimeError = "End time should be greater than start time.";
      }

      if (!card.price) {
        card.priceError = "Price is required.";
      } else if (isNaN(card.price) || parseFloat(card.price) < 0) {
        card.priceError = "Price must be a non-negative number.";
      }

      if (!card.type) {
        card.typeError = "Type is required.";
      }
    },
    addShiftCard() {
      if (this.selectedDate) {
        const card = {
          title: this.selectedDate,
          startTime: "",
          endTime: "",
          price: "",
          type: "Consultation",
        };
        this.newShift.cards.push(card);
      }
      this.validateDates();
    },
    removeShiftCard(index) {
      this.newShift.cards.splice(index, 1);
    },
    saveShifts() {
      this.showSaveClicked = true;
      this.validateTitle();
      this.validateDates();
      this.newShift.cards.forEach(this.validateCard);
      if (
        !this.titleError &&
        !this.datesError &&
        !this.newShift.cards.some(
          (card) =>
            card.startTimeError ||
            card.endTimeError ||
            card.priceError ||
            card.typeError
        )
      ) {
        if (this.editingShiftIndex !== null) {
          const editedShift = this.shifts[this.editingShiftIndex];
          editedShift.title = this.newShift.title;
          editedShift.description = this.newShift.description;
          editedShift.cards = [...this.newShift.cards];
        } else {
          this.$store.commit("addShift", this.newShift);
        }
        this.editingShiftIndex = null;
        this.clearSlider();
      }
    },
    editShift(index) {
      const shiftToEdit = this.shifts[index];
      this.editingShiftIndex = index;

      // Fill data in newShift and selectedDate for editing
      this.newShift.title = shiftToEdit.title;
      this.newShift.description = shiftToEdit.description;
      this.selectedDate = shiftToEdit.cards[0].title; // Assuming the first card's title is the date
      this.newShift.cards = [...shiftToEdit.cards];

      this.showSlider = true;
    },
    clearSlider() {
      this.newShift = {
        title: "",
        description: "",
        cards: [],
      };
      this.selectedDate = "";
      this.showSlider = false;
      this.titleError = "";
      this.datesError = "";
      this.selectedPrice = 0;
    },
  },
};
</script>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.5s;
}
.slide-enter,
.slide-leave-to {
  transform: translateX(100%);
}
.titleHeader {
  padding: 0px 85px;
}
.slider {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: 400px;
  background: #f5f5f5;
}

.slider-content {
  padding: 20px;
}

.shift-cards {
  display: flex;
  flex-wrap: wrap;
}
/* .card {
  background-color: black;
  color: white;
} */
.shift-card {
  flex: 1 1 calc(33.33% - 20px);
}
.closeIcon {
  border: 1px solid;
  background-color: white;
  border-radius: 50%;
  height: 25px;
  padding: 0px 8px;
  cursor: pointer;
}

.cardContainer {
  border: none;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
.carChild {
  padding: 20px;
}
.clsAl {
  text-align: center;
}
.range-input::-webkit-slider-thumb {
  background-color: rgb(255, 108, 134);
}
.setUnderline {
  position: relative;
  display: inline-block;
}

.setUnderline h4::after {
  content: "";
  position: absolute;
  bottom: 0px;
  top: 29px;
  left: 84px;
  width: 6%;
  height: 3px;
  background-color: rgb(255, 108, 134);
}

.test h4::after {
  content: "";
  position: absolute;
  bottom: 0px;
  top: 53px;
  left: 25px;
  width: 12%;
  height: 3px;
  background-color: rgb(255, 108, 134);
}
</style>
