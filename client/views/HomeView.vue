<script setup lang="ts">
import WorkoutListComponent from "@/components/Workout/WorkoutListComponent.vue";
import CreateWorkoutForm from "@/components/Workout/CreateWorkoutForm.vue";
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";
import LoginView from "./LoginView.vue";

const { currentUsername, isLoggedIn } = storeToRefs(useUserStore());
</script>

<template>
  <main>
    <section class="welcome-section" v-if="isLoggedIn">
      <h1>Welcome {{ currentUsername }}!</h1>
    </section>
    <div class="container">
      <div class="box" v-if="isLoggedIn">
        <CreateWorkoutForm />
      </div>
      <div class="box" v-if="isLoggedIn">
        <WorkoutListComponent />
      </div>
      <div class="box" v-else>
        <LoginView />
      </div>
    </div>
  </main>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap"); /* Importing the Roboto font */

body {
  font-family: "Roboto", sans-serif; /* Applying the Roboto font */
  background-color: #f0f2f5; /* Light background color */
  margin: 0; /* Removes default margin */
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

main {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 2em;
}

.welcome-section {
  margin-bottom: 2em;
}

h1 {
  text-align: center;
  font-size: 2em;
  color: #333;
}

.container {
  display: flex;
  flex-wrap: wrap;
  gap: 2em;
  justify-content: center;
  width: 100%;
}

.box {
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 1.5em;
  width: 100%; /* Set the width to 100% to make it responsive */
  max-width: 400px; /* Set a max-width if you want to limit the width on larger screens */
}

@media (max-width: 768px) {
  .container {
    flex-direction: column;
    align-items: center;
  }
}
</style>
