<script setup lang="ts">
import { computed } from "vue";

const props = defineProps(["PR"]);

const prName = computed(() => {
  if (!props.PR || !props.PR.type) {
    return "Personal Record";
  }
  switch (props.PR.type) {
    case "2kErgTest":
      return "2k Erg Test";
    case "6kErgTest":
      return "6k Erg Test";
    case "halfMarathon":
      return "Half Marathon Erg";
    case "fullMarathon":
      return "Full Marathon Erg";
    case "1mRun":
      return "1 Mile Run";
    case "5kRun":
      return "5k Run";
    case "maxBenchPress":
      return "Max Bench Press";
    case "maxSquat":
      return "Max Squat";
    default:
      return "Personal Record";
  }
});

const convertToHHMMSS = (seconds: number) => {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  return `${String(hrs).padStart(2, "0")}:${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
};

const prValue = computed(() => {
  if (["maxBenchPress", "maxSquat"].includes(props.PR.type)) {
    return props.PR.pr;
  } else {
    return convertToHHMMSS(Number(props.PR.pr));
  }
});
</script>

<template>
  <div class="pr-card">
    <h2>{{ prName }}</h2>
    <p>{{ props.PR.rower }}</p>
    <p class="pr-date">Date: {{ props.PR.date }}</p>
    <p class="pr-value">Value: {{ prValue }}</p>
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

.pr-card .pr-date,
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
