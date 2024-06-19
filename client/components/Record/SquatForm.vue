<script setup lang="ts">
import { ref } from "vue";

const athleteName = ref("");
const recordDate = ref("");
const recordWeight = ref<number | null>(null);

const submitRecord = () => {
  // Implement your submit logic here
  console.log("Record submitted:", {
    athleteName: athleteName.value,
    recordDate: recordDate.value,
    recordWeight: recordWeight.value,
  });
};
</script>

<template>
  <form class="record-form">
    <h2>Enter Your Max Squat</h2>
    <div class="form-group">
      <label for="recordDate">Date of Record</label>
      <input type="date" id="recordDate" v-model="recordDate" required />
    </div>
    <div class="form-group">
      <label for="recordWeight">Record Weight (kg)</label>
      <input type="number" id="recordWeight" v-model="recordWeight" placeholder="Enter weight in kg" required />
    </div>
    <button type="submit" @click.prevent="submitRecord">Submit</button>
  </form>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap"); /* Importing the Roboto font */

.record-form {
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
  padding: 2em;
  width: 100%;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

h2 {
  font-size: 1.5em;
  color: #00796b; /* Athletic theme color */
  margin-bottom: 1em;
}

.form-group {
  width: 100%;
  margin-bottom: 1em;
}

label {
  display: block;
  font-weight: bold;
  margin-bottom: 0.5em;
  color: #333;
}

input[type="text"],
input[type="date"],
input[type="number"] {
  width: 100%;
  padding: 0.5em;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-sizing: border-box;
  font-family: "Roboto", sans-serif;
  font-size: 1em;
}

button {
  background-color: #00796b;
  color: white;
  padding: 0.75em 1.5em;
  border: none;
  border-radius: 5px;
  font-size: 1em;
  cursor: pointer;
  font-family: "Roboto", sans-serif;
}

button:hover {
  background-color: #005f56;
}
</style>
