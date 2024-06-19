<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import { formatDate } from "@/utils/formatDate";
import { storeToRefs } from "pinia";

const props = defineProps(["pr"]);
const { currentUsername } = storeToRefs(useUserStore());
</script>

<template>
  <p class="rower">{{ props.pr.rower }}</p>
  <p class="meter"><i class="fas fa-running"></i> {{ props.pr.pr }}</p>
  <p class="timestamp"><i class="far fa-clock"></i> Created on: {{ formatDate(props.pr.dateCreated) }}</p>
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
