<script setup lang="ts">
import { ref } from "vue";
import { fetchy } from "../../utils/fetchy";
import { formatDate } from "../../utils/formatDate";

const props = defineProps(["workout"]);
const meter = ref(props.workout.meter);
const description = ref(props.workout.description);
const emit = defineEmits(["editWorkout", "refreshWorkouts"]);

const editWorkout = async () => {
  try {
    await fetchy(`/api/workouts/${props.workout._id}`, "PATCH", { body: { update: { meter: meter.value, description: description.value } } });
  } catch (e) {
    return;
  }
  emit("editWorkout");
  emit("refreshWorkouts");
};
</script>

<template>
  <form @submit.prevent="editWorkout">
    <div class="form-group">
      <label for="meter"> <i class="fas fa-clock-o"></i> Meter: </label>
      <input id="meter" type="number" v-model="meter" placeholder="Enter meter" required />
    </div>
    <div class="form-group">
      <label for="description"> <i class="fas fa-pen"></i> Description: </label>
      <textarea id="description" v-model="description" placeholder="Enter description"></textarea>
    </div>
    <div class="base">
      <menu>
        <li><button class="btn-small pure-button-primary pure-button" type="submit">Save</button></li>
        <li><button class="btn-small pure-button" @click="emit('editWorkout')">Cancel</button></li>
      </menu>
      <p v-if="props.workout.dateCreated !== props.workout.dateUpdated" class="timestamp">Edited on: {{ formatDate(props.workout.dateUpdated) }}</p>
      <p v-else class="timestamp">Created on: {{ formatDate(props.workout.dateCreated) }}</p>
    </div>
  </form>
</template>

<style scoped>
form {
  background-color: var(--base-bg);
  display: flex;
  flex-direction: column;
  gap: 0.5em;
}

textarea,
input {
  font-family: inherit;
  font-size: inherit;
  border-radius: 4px;
  resize: none;
}

textarea {
  height: 6em;
}

p {
  margin: 0em;
}

.form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 1em;
}

label {
  font-size: 1em;
  margin-bottom: 0.5em;
  display: flex;
  align-items: center;
  gap: 0.5em;
}

input,
textarea {
  padding: 0.5em;
  border: 1px solid #ccc;
  width: 100%;
  box-sizing: border-box;
}

.author {
  font-weight: bold;
  font-size: 1.2em;
}

menu {
  list-style-type: none;
  display: flex;
  flex-direction: row;
  gap: 1em;
  padding: 0;
  margin: 0;
}

.base {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.timestamp {
  display: flex;
  justify-content: flex-end;
  font-size: 0.9em;
  font-style: italic;
}
</style>
