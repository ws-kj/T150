<script setup lang="ts">
import { ref } from "vue";

const athlete = ref("");
const emit = defineEmits(["getWorkoutsByAthlete"]);
</script>

<template>
  <form @submit.prevent="emit('getWorkoutsByAthlete', athlete)" class="pure-form">
    <fieldset>
      <legend>Search by Athlete</legend>
      <input id="athlete" type="text" v-model="athlete" placeholder="Username" />
      <button type="submit" class="pure-button pure-button-primary">Search</button>
    </fieldset>
  </form>
</template>

<style scoped>
form {
  display: flex;
  gap: 0.5em;
  padding: 1em;
  align-items: center;
}
</style>
