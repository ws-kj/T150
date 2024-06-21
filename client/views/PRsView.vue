<script setup lang="ts">
import { ref } from "vue";
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";
import PRListComponent from "@/components/Record/PRListComponent.vue";

const { isLoggedIn } = storeToRefs(useUserStore());

const selectedPRType = ref("2kErgTest");
</script>

<template>
  <main>
    <div v-if="isLoggedIn" class="content-container">
      <div class="dropdown-container">
        <label for="prType">Select PR Type:</label>
        <select id="prType" v-model="selectedPRType">
          <option value="2kErgTest">2k Erg Test</option>
          <option value="6kErgTest">6k Erg Test</option>
          <option value="halfMarathon">Half Marathon Erg</option>
          <option value="fullMarathon">Full Marathon Erg</option>
          <option value="1mRun">1 Mile Run</option>
          <option value="5kRun">5k Run</option>
          <option value="maxBenchPress">Max Bench Press</option>
          <option value="maxSquat">Max Squat</option>
        </select>
      </div>
      <PRListComponent :PRType="selectedPRType" />
    </div>
  </main>
</template>

<style scoped>
h1 {
  text-align: center;
}

.content-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 1em;
}

.dropdown-container {
  text-align: center;
  background-color: rgba(255, 255, 255, 0.8);
  padding: 1em;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 2em;
}

label {
  margin-right: 0.5em;
  font-size: 1.2em;
  color: #333;
}

select {
  padding: 0.5em;
  font-size: 1em;
  border-radius: 5px;
  border: 1px solid #ddd;
  background-color: white;
}
</style>
