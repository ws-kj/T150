<script setup lang="ts">
import { computed } from "vue";

const props = defineProps(["pr"]);

// Function to get the name based on the type
const prName = computed(() => {
  switch (props.pr.type) {
    case "twok":
      return "2k";
    case "swim":
      return "Swimming Personal Record";
    case "bike":
      return "Cycling Personal Record";
    case "lift":
      return "Weightlifting Personal Record";
    default:
      return "Personal Record";
  }
});
</script>

<template>
  <div class="pr-card">
    <h2>{{ prName }}</h2>
    <p class="pr-value">{{ pr.pr }}</p>
  </div>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap"); /* Importing the Roboto font */
@import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"); /* Importing Font Awesome */

body {
  font-family: "Roboto", sans-serif; /* Applying the Roboto font */
}

.pr-card {
  background-color: rgba(255, 255, 255, 0.8); /* White with slight transparency */
  border-radius: 15px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
  padding: 2em;
  max-width: 300px;
  text-align: center;
  margin: 1em auto;
  color: #333;
}

.pr-card h2 {
  font-size: 1.5em;
  margin-bottom: 0.5em;
  color: #00796b; /* Athletic theme color */
}

.pr-card .pr-value {
  font-size: 1.2em;
  color: #555;
}

@media (max-width: 768px) {
  .pr-card {
    padding: 1em;
  }
}
</style>
