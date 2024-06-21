<script setup lang="ts">
import MeterListComponent from "@/components/Record/MeterListComponent.vue";
// import TwoKListComponent from "@/components/Record/TwoKListComponent.vue";
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";

const { currentUsername, isLoggedIn } = storeToRefs(useUserStore());
</script>

<template>
  <main>
    <MeterListComponent v-if="isLoggedIn" />
  </main>
</template>

<style scoped>
h1 {
  text-align: center;
}
</style>
