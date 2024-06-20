<script setup lang="ts">
import { ref, computed } from "vue";
import { fetchy } from "../../utils/fetchy";
import { defineEmits } from "vue";

const type = ref("");
const meter = ref(0);
const workoutDate = ref("");
const description = ref("");
const error = ref("");
const emit = defineEmits(["refreshWorkouts"]);
const isLiftSession = computed(() => type.value === "lift");

const validateInput = () => {
  if (!Number.isInteger(meter.value) || meter.value <= 0) {
    error.value = "Meter or sessions must be a positive integer.";
    return false;
  }
  error.value = "";
  return true;
};

const createWorkout = async () => {
  if (!validateInput()) {
    return;
  }

  try {
    await fetchy("/api/workouts", "POST", {
      body: { type: type.value, meter: meter.value, workoutDate: workoutDate.value, description: description.value },
    });
    emit("refreshWorkouts");
    emptyForm();
  } catch (_) {
    return;
  }
};

const emptyForm = () => {
  type.value = "";
  meter.value = 0;
  workoutDate.value = "";
  description.value = "";
  error.value = "";
};
</script>

<template>
  <form @submit.prevent="createWorkout">
    <div class="form-group">
      <label for="type"> <i class="fas fa-dumbbell"></i> Workout Type: </label>
      <select id="type" v-model="type" required>
        <option value="" disabled>Select workout type</option>
        <option value="single">1x</option>
        <option value="double/pair">2x/2-</option>
        <option value="eight">4x/4-/4+/8+</option>
        <option value="erg">Erg</option>
        <option value="running">Run</option>
        <option value="cycling">Bike</option>
        <option value="bikeerg">C2 Bike</option>
        <option value="swimming">Swimming</option>
        <option value="lift">Lift session</option>
      </select>
    </div>

    <div v-if="!isLiftSession" class="form-group">
      <label for="meter"> <i class="fas fa-clock-o"></i> Meter: </label>
      <input id="meter" type="number" v-model.number="meter" placeholder="Enter meter" required />
    </div>

    <div v-else class="form-group">
      <label for="sessions"> <i class="fas fa-dumbbell"></i> Sessions: </label>
      <input id="sessions" type="number" v-model.number="meter" placeholder="Enter number of sessions" required />
    </div>

    <div class="form-group">
      <label for="date"> <i class="fas fa-calendar-alt"></i> Workout Date: </label>
      <input id="date" type="date" v-model="workoutDate" required />
    </div>

    <div class="form-group">
      <label for="description"> <i class="fas fa-pen"></i> Description: </label>
      <textarea id="description" v-model="description" placeholder="Enter description"></textarea>
    </div>

    <p v-if="error" class="error-message">{{ error }}</p>

    <button type="submit" class="submit-button"><i class="fas fa-plus-circle"></i> Add</button>
  </form>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap");
@import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css");

body {
  font-family: "Roboto", sans-serif;
  background-color: #f0f2f5;
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

form {
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 2em;
  width: 100%;
  max-width: 400px;
  text-align: center;
  font-family: "Roboto", sans-serif;
}

h2 {
  font-size: 1.5em;
  margin-bottom: 1em;
  color: #333;
}

.form-group {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 1em;
}

.form-group label {
  font-size: 1em;
  color: #555;
  margin-bottom: 0.5em;
  display: flex;
  align-items: center;
  gap: 0.5em;
}

.form-group select,
.form-group textarea,
.form-group input {
  font-family: inherit;
  font-size: 1em;
  padding: 0.5em;
  border-radius: 4px;
  border: 1px solid #ccc;
  width: 100%;
  box-sizing: border-box;
}

.form-group textarea {
  resize: none;
  height: 100px;
}

#error {
  height: auto;
}

.error-message {
  color: red;
  margin-top: -10px;
  margin-bottom: 10px;
  font-size: 0.9em;
}

.submit-button {
  padding: 0.75em 1.5em;
  background-color: #28a745;
  border: none;
  border-radius: 5px;
  color: white;
  font-size: 1em;
  cursor: pointer;
  transition: background-color 0.3s;
  display: flex;
  align-items: center;
  gap: 0.5em;
}

.submit-button:hover {
  background-color: #218838;
}

.submit-button i {
  font-size: 1.2em;
}
</style>
