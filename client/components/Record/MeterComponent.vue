<script setup lang="ts">
const props = defineProps(["record"]);
</script>

<template>
  <div class="record-card">
    <div class="athlete-info">
      <h2 class="athlete-name">{{ props.record.athlete }}</h2>
      <p class="total-meter">
        Total Meters: <strong>{{ props.record.totalMeter }}</strong>
      </p>
    </div>
  </div>
</template>

<style scoped>
.record-card {
  background-color: var(--base-bg, #f5f5f5);
  border-radius: 1em;
  padding: 1em;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 400px;
  margin: 1em auto;
  text-align: center;
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
}
</style>
