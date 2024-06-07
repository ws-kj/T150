<script setup lang="ts">
import { ref } from "vue";
import LoginForm from "@/components/Login/LoginForm.vue";
import RegisterForm from "@/components/Login/RegisterForm.vue";

const activeTab = ref("login");

const setActiveTab = (tab: string) => {
  activeTab.value = tab;
};
</script>

<template>
  <main class="login-container">
    <h2>Please login or register!</h2>
    <div class="tabs">
      <button :class="{ active: activeTab === 'login' }" @click="setActiveTab('login')">Login</button>
      <button :class="{ active: activeTab === 'register' }" @click="setActiveTab('register')">Register</button>
    </div>
    <div class="form-container">
      <LoginForm v-if="activeTab === 'login'" />
      <RegisterForm v-else />
    </div>
  </main>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap");

body {
  font-family: "Roboto", sans-serif;
  background-color: #f0f2f5;
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.login-container {
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 2em;
  width: 100%;
  max-width: 400px;
  text-align: center;
}

h2 {
  font-size: 1.5em;
  margin-bottom: 1em;
  color: #333;
}

.tabs {
  display: flex;
  justify-content: space-around;
  margin-bottom: 1.5em;
}

.tabs button {
  background: none;
  border: none;
  padding: 0.5em 1em;
  cursor: pointer;
  font-size: 1em;
  color: #555;
  transition: color 0.3s;
}

.tabs button.active {
  font-weight: bold;
  color: #007bff;
  border-bottom: 2px solid #007bff;
}

.tabs button:hover {
  color: #007bff;
}

.form-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

form {
  width: 100%;
}

input {
  width: calc(100% - 1em);
  padding: 0.5em;
  margin-bottom: 1em;
  border: 1px solid #ccc;
  border-radius: 5px;
}

button {
  padding: 0.5em 1em;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #0056b3;
}
</style>
