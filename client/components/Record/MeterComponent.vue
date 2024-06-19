<script setup lang="ts">
const props = defineProps(["record"]);
</script>

<template>
  <div class="record-card">
    <div class="icon-container">
      <i class="fas fa-trophy"></i>
      <!-- Icon for achievements or records -->
    </div>
    <div class="athlete-info">
      <h2 class="athlete-name">{{ props.record.rower }}</h2>
      <p class="total-meter">
        <i class="fas fa-dumbbell"></i>
        <!-- Icon for meters or workout -->
        Total Meters: <strong>{{ props.record.meter }}</strong>
      </p>
    </div>
  </div>
</template>

<style scoped>
.record-card {
  background-color: #ffffff; /* White background */
  border-radius: 10px;
  padding: 1.5em;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 400px;
  margin: 1em auto;
  text-align: center;
}

.icon-container {
  background-color: #00796b; /* Teal background for icon container */
  color: #ffffff; /* White icon color */
  border-radius: 50%;
  padding: 0.5em;
  margin-bottom: 1em; /* Spacing below the icon */
}

.icon-container i {
  font-size: 2em; /* Larger icon size */
}

.athlete-info {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.athlete-name {
  font-weight: bold;
  font-size: 1.5em;
  margin-bottom: 0.5em;
}

.total-meter {
  font-size: 1.2em;
  color: #555;
  display: flex;
  align-items: center;
}

.total-meter i {
  margin-right: 5px; /* Spacing between icon and text */
}
</style>
