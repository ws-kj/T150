<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import { fetchy } from "@/utils/fetchy";
import { storeToRefs } from "pinia";
import { onBeforeMount, ref } from "vue";
import router from "@/router";
import PRViewComponent from "../components/Record/PRViewComponent.vue";
// import TwoKForm from "../components/Record/TwoKForm.vue";
// import SixKForm from "../components/Record/SixKForm.vue";
// import BenchPressForm from "../components/Record/BenchPressForm.vue";
// import SquatForm from "../components/Record/SquatForm.vue";

const { currentUsername, isLoggedIn } = storeToRefs(useUserStore());
const { deleteUser } = useUserStore();

const props = defineProps(["username"]);
const totalMeter = ref(0);
const PRs = ref<Array<Record<string, string>>>([]);

async function fetchData() {
  try {
    totalMeter.value = await fetchy("/api/meter", "GET");
    PRs.value = await fetchy("/api/prs", "GET");
  } catch (e) {
    console.log(e);
  }
}

async function delete_() {
  await deleteUser();
  void router.push({ name: "Home" });
}

onBeforeMount(async () => {
  await fetchData();
});
</script>

<template>
  <div class="full-wrapper">
    <div class="profile-wrapper">
      <div class="profile-info">
        <p class="username">{{ props.username }}</p>
        <p>Total meters: {{ totalMeter }}</p>
        <RouterLink v-if="isLoggedIn && props.username == currentUsername" class="settings" :to="{ name: 'Settings' }">
          <!-- <button class="button-secondary pure-button">Settings</button> -->
          <button class="button-error pure-button" @click="delete_">Delete User</button>
        </RouterLink>
      </div>
      <div class="pr-list">
        <h3>Personal Records</h3>
        <article v-for="pr in PRs" :key="pr._id" class="pr-item">
          <PRViewComponent :pr="pr" />
        </article>
      </div>
    </div>
    <!-- <div class="forms-wrapper">
      <TwoKForm />
      <SixKForm />
      <BenchPressForm />
      <SquatForm />
    </div> -->
  </div>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap");
@import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css");

body {
  font-family: "Roboto", sans-serif;
  background-color: #e0f7fa;
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.full-wrapper {
  padding: 2em;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.profile-wrapper {
  background-color: #ffffff;
  border: 2px solid #00796b;
  border-radius: 10px;
  padding: 1em;
  width: 100%;
  max-width: 600px;
  margin-bottom: 2em;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.profile-info {
  margin-bottom: 1em;
}

.username {
  font-weight: bold;
  font-size: 1.5em;
  color: #00796b;
  margin-bottom: 0.5em;
}

button {
  padding: 0.5em 1em;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.button-secondary {
  background-color: #00796b;
  color: white;
}

.button-secondary:hover {
  background-color: #005f56;
}

.button-error {
  background-color: #d32f2f;
  color: white;
}

.button-error:hover {
  background-color: #b71c1c;
}

.pr-list {
  margin-top: 2em;
}

.pr-item {
  background: rgba(255, 255, 255, 0.8);
  border-radius: 10px;
  padding: 1em;
  margin-bottom: 1em;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.forms-wrapper {
  display: flex;
  flex-direction: column;
  gap: 1em;
  width: 100%;
  max-width: 600px;
}
</style>
