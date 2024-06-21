<script setup lang="ts">
import router from "@/router";
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";
import UpdateUserForm from "../components/Setting/UpdateUserForm.vue";
// import TwoKForm from "../components/Record/TwoKForm.vue";
// import SixKForm from "../components/Record/SixKForm.vue";
// import BenchPressForm from "../components/Record/BenchPressForm.vue";
// import SquatForm from "../components/Record/SquatForm.vue";

const { currentUsername } = storeToRefs(useUserStore());
const { logoutUser, deleteUser } = useUserStore();

async function logout() {
  await logoutUser();
  void router.push({ name: "Home" });
}

async function delete_() {
  await deleteUser();
  void router.push({ name: "Home" });
}
</script>

<template>
  <main class="column">
    <h1>Settings for {{ currentUsername }}</h1>
    <button class="pure-button pure-button-primary" @click="logout">Logout</button>
    <button class="button-error pure-button" @click="delete_">Delete User</button>
    <UpdateUserForm />
    <!-- <TwoKForm />
    <SixKForm />
    <BenchPressForm />
    <SquatForm /> -->
  </main>
</template>
