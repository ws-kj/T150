<script setup lang="ts">
import { ref } from "vue";
import { fetchy } from "../../utils/fetchy";

const type = ref("");
const meter = ref("");
const workoutDate = ref("");
const emit = defineEmits(["refreshPosts"]);

const createWorkout = async (type: string, meter: string, workoutDate: string) => {
  try {
    await fetchy("/api/workouts", "POST", {
      body: { type, meter, workoutDate },
    });
  } catch (_) {
    return;
  }
  emit("refreshPosts");
  emptyForm();
};

const emptyForm = () => {
  type.value = "";
  meter.value = "";
  workoutDate.value = "";
};
</script>

<template>
  <form @submit.prevent="createWorkout(type, meter, workoutDate)">
    <div class="form-group">
      <label for="type"> <i class="fas fa-dumbbell"></i> Workout Type: </label>
      <select id="type" v-model="type" required>
        <option value="" disabled>Select workout type</option>
        <option value="cardio">Cardio</option>
        <option value="strength">Strength</option>
        <option value="flexibility">Flexibility</option>
        <option value="balance">Balance</option>
      </select>
    </div>

    <div class="form-group">
      <label for="meter"> <i class="fas fa-clock-o"></i> Meter: </label>
      <textarea id="meter" v-model="meter" placeholder="Enter meter" required></textarea>
    </div>

    <div class="form-group">
      <label for="date"> <i class="fas fa-calendar-alt"></i> Workout Date: </label>
      <input id="date" type="date" v-model="workoutDate" required />
    </div>

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
