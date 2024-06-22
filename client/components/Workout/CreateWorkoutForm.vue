<script setup lang="ts">
import { ref, computed } from "vue";
import { fetchy } from "../../utils/fetchy";
import { defineEmits } from "vue";

const type = ref("");
const meter = ref(0);
const unit = ref("meters");
const workoutDate = ref("");
const description = ref("");
const error = ref("");
const showModal = ref(false);
const emit = defineEmits(["refreshWorkouts"]);
const isLiftSession = computed(() => type.value === "lift");

const validateInput = () => {
  if (meter.value <= 0) {
    error.value = "Distance or sessions must be a positive number.";
    return false;
  }
  error.value = "";
  return true;
};

const convertToMeters = (value: number, unit: string) => {
  switch (unit) {
    case "kilometers":
      return value * 1000;
    case "miles":
      return value * 1609.34;
    default:
      return value;
  }
};

const createWorkout = async () => {
  if (!validateInput()) {
    return;
  }

  const meterInMeters = convertToMeters(meter.value, unit.value);

  try {
    await fetchy("/api/workouts", "POST", {
      body: { type: type.value, meter: meterInMeters, workoutDate: workoutDate.value, description: description.value },
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
  unit.value = "meters";
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
      <label for="meter"> <i class="fas fa-clock-o"></i> Distance: </label>
      <div class="input-group">
        <input id="meter" type="number" step="0.01" v-model.number="meter" placeholder="Enter distance" required />
        <select v-model="unit" class="unit-select">
          <option value="meters">Meters</option>
          <option value="kilometers">Kilometers</option>
          <option value="miles">Miles</option>
        </select>
      </div>
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
    <button type="button" class="info-button" @click="showModal = true"><i class="fas fa-info-circle"></i> How to Log Workouts</button>

    <div v-if="showModal" class="modal-overlay" @click.self="showModal = false">
      <div class="modal-content">
        <h2>How to Log Workouts</h2>
        <p>Follow these steps to log your workouts:</p>
        <ol>
          <li>Select the workout type from the dropdown menu.</li>
          <li>Enter the distance of your workout.</li>
          <li>If you are entering a lift session, just enter 1. 1 lift session is at least half an hour.</li>
          <li>Select the workout date.</li>
          <li>Provide a description (optional).</li>
          <li>Click "Add" to log your workout.</li>
        </ol>
        <p>Conversion metrics:</p>
        <ol>
          <li>1m running = 1.5m erging</li>
          <li>1m single = 1.5m erging</li>
          <li>1m double/pair = 1.25m erging</li>
          <li>1m bike erg = 0.45m erging</li>
          <li>1m cycling = 0.34m erging</li>
          <li>1 lift session = 5000m erging</li>
        </ol>
        <button @click="showModal = false" class="close-button">Close</button>
      </div>
    </div>
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

.input-group {
  display: flex;
  align-items: center;
  gap: 0.5em;
}

.unit-select {
  width: 100px;
}

.error-message {
  color: red;
  margin-top: -10px;
  margin-bottom: 10px;
  font-size: 0.9em;
}

.submit-button,
.info-button {
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
  margin-top: 1em;
}

.submit-button:hover,
.info-button:hover {
  background-color: #218838;
}

.submit-button i,
.info-button i {
  font-size: 1.2em;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: #fff;
  padding: 2em;
  border-radius: 10px;
  max-width: 500px;
  width: 90%;
  text-align: center;
  position: relative;
}

.close-button {
  padding: 0.5em 1em;
  background-color: #dc3545;
  border: none;
  border-radius: 5px;
  color: white;
  font-size: 1em;
  cursor: pointer;
  transition: background-color 0.3s;
  position: absolute;
  top: 10px;
  right: 10px;
}

.close-button:hover {
  background-color: #c82333;
}
</style>
