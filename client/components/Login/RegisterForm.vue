<script setup lang="ts">
import router from "@/router";
import { useUserStore } from "@/stores/user";
import { ref } from "vue";

const username = ref("");
const password = ref("");
const code = ref("");
const profilePhoto = ref("");
const { createUser, loginUser, updateSession } = useUserStore();

async function register() {
  if (profilePhoto.value === "") {
    return;
  }
  await createUser(username.value, password.value, code.value, profilePhoto.value);
  await loginUser(username.value, password.value);
  await updateSession();
  void router.push({ name: "Home" });
}

async function assignURL(url: string) {
  profilePhoto.value = url;
}
</script>

<template>
  <form class="pure-form pure-form-aligned" @submit.prevent="register">
    <h3>Register User</h3>
    <fieldset>
      <div class="pure-control-group">
        <label for="aligned-username">Username</label>
        <input v-model.trim="username" type="text" id="aligned-username" placeholder="Username" required />
      </div>
      <div class="pure-control-group">
        <label for="aligned-username">Code</label>
        <input v-model.trim="code" type="text" id="aligned-username" placeholder="***" required />
      </div>
      <div class="pure-control-group">
        <label for="aligned-password">Password</label>
        <input type="password" v-model.trim="password" id="aligned-password" placeholder="Password" required />
      </div>
      <div class="pure-controls">
        <button id="Register" type="submit" class="pure-button pure-button-primary">Register</button>
      </div>
    </fieldset>
  </form>
</template>

<style scoped>
h3 {
  display: flex;
  justify-content: center;
}

.button {
  border: 3px;
  border-radius: 16px;
}

#Register {
  animation: pulse 1s infinite alternate;
}

@keyframes pulse {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(1.1);
  }
}
</style>
