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
      <h1>
        Welcome, <span class="username">{{ currentUsername }}</span
        >!
      </h1>
    </section>
    <div class="container">
      <div class="column" v-if="isLoggedIn">
        <div class="box">
          <div class="icon-container">
            <i class="fas fa-dumbbell icon"></i>
          </div>
          <CreateWorkoutForm />
        </div>
        <div class="box">
          <div class="icon-container">
            <i class="fas fa-list icon"></i>
          </div>
          <WorkoutListComponent />
        </div>
      </div>
      <div class="box" v-else>
        <LoginView />
      </div>
    </div>
  </main>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap"); /* Importing the Roboto font */
@import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"); /* Importing Font Awesome */

body {
  font-family: "Roboto", sans-serif; /* Applying the Roboto font */
  background-color: rgba(224, 247, 250, 0.8); /* Light athletic background color with transparency */
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
  font-size: 2.5em;
  color: #0044cc; /* Deep blue for the main text */
}

.username {
  color: #ff4500; /* Bright red for the username */
  font-weight: bold;
  font-family: "Roboto", sans-serif; /* Ensuring the username uses Roboto font */
}

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.column {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 2em; /* Space between the boxes */
}

.box {
  background-color: rgba(255, 255, 255, 0.8); /* White with slight transparency */
  border-radius: 15px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
  padding: 2em;
  width: 100%;
  max-width: 600px; /* Set a max-width for larger screens */
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}

.box > * {
  width: 100%;
}

.icon-container {
  position: absolute;
  top: -30px;
  background-color: #0044cc; /* Deep blue for the icon container */
  border-radius: 50%;
  padding: 10px;
  color: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.icon {
  font-size: 2em;
}

@media (max-width: 768px) {
  .container {
    padding: 1em; /* Adjust padding for small screens */
  }

  .box {
    max-width: 100%;
  }
}
</style>
