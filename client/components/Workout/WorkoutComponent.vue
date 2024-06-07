<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import { formatDate } from "@/utils/formatDate";
import { storeToRefs } from "pinia";
import { fetchy } from "../../utils/fetchy";

const props = defineProps(["workout"]);
const emit = defineEmits(["editWorkout", "refreshWorkouts"]);
const { currentUsername } = storeToRefs(useUserStore());

const deleteWorkout = async () => {
  try {
    await fetchy(`/api/workouts/${props.workout._id}`, "DELETE");
  } catch {
    return;
  }
  emit("refreshWorkouts");
};
</script>

<template>
  <div class="workout">
    <div class="workout-details">
      <div class="athlete-type">
        <p class="athlete">{{ props.workout.athlete }}</p>
        <p class="workout-type"><i class="fas fa-dumbbell"></i> {{ props.workout.type }}</p>
      </div>
      <p class="meter"><i class="fas fa-running"></i> {{ props.workout.meter }} meters</p>
    </div>
    <div class="actions">
      <menu v-if="props.workout.athlete == currentUsername">
        <li>
          <button class="edit-button" @click="emit('editWorkout', props.workout._id)"><i class="fas fa-edit"></i> Edit</button>
        </li>
        <li>
          <button class="delete-button" @click="deleteWorkout"><i class="fas fa-trash-alt"></i> Delete</button>
        </li>
      </menu>
      <p class="timestamp"><i class="far fa-clock"></i> Created on: {{ formatDate(props.workout.workoutDate) }}</p>
    </div>
  </div>
</template>

<style scoped>
.workout {
  background-color: #f9f9f9;
  border-radius: 10px;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.workout-details {
  display: flex;
  align-items: center;
}

.athlete-type {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.athlete {
  font-weight: bold;
  font-size: 1.2em;
  margin-bottom: 5px;
}

.workout-type {
  font-size: 0.9em;
  color: #777;
  margin-bottom: 5px;
}

.meter {
  font-size: 1em;
  color: #555;
}

.actions {
  display: flex;
  align-items: center;
}

.menu {
  list-style-type: none;
  display: flex;
  flex-direction: row;
  gap: 1em;
  padding: 0;
  margin: 0;
}

.timestamp {
  font-size: 0.9em;
  color: #777;
}

.edit-button,
.delete-button {
  padding: 0.5em 1em;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
  display: flex;
  align-items: center;
}

.edit-button:hover,
.delete-button:hover {
  background-color: #007bff;
  color: white;
}

.edit-button i,
.delete-button i {
  margin-right: 5px;
}

@media (max-width: 768px) {
  .workout {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
