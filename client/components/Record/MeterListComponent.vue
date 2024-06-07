<script setup lang="ts">
import { useUserStore } from "../../stores/user";
import { fetchy } from "../../utils/fetchy";
import { storeToRefs } from "pinia";
import { onBeforeMount, ref } from "vue";
import MeterComponent from "./MeterComponent.vue";

const { isLoggedIn } = storeToRefs(useUserStore());

const loaded = ref(false);
const records = ref<Array<Record<string, string>>>([]);

async function getAllMeter() {
  const query = {};
  let recordResults;
  try {
    recordResults = await fetchy("/api/record", "GET", { query });
    console.log("Fetched records:", recordResults); // Added log to check fetched records
    records.value = recordResults;
  } catch (error) {
    console.error("Failed to fetch records:", error);
    return;
  }
}

onBeforeMount(async () => {
  await getAllMeter();
  loaded.value = true;
  console.log("Loaded state:", loaded.value); // Added log to check loaded state
  console.log("Records:", records.value); // Added log to check records state
});
</script>

<template>
  <section class="posts" v-if="loaded && records.length !== 0">
    <article v-for="record in records" :key="record._id">
      <MeterComponent :record="record" />
    </article>
  </section>
  <p v-else-if="loaded">No posts found</p>
  <p v-else>Loading...</p>
</template>

<style scoped>
section {
  display: flex;
  flex-direction: column;
  gap: 1em;
}

section,
p,
.row {
  margin: 0 auto;
  max-width: 60em;
}

article {
  background-color: var(--base-bg);
  border-radius: 1em;
  display: flex;
  flex-direction: column;
  gap: 0.5em;
  padding: 1em;
}

.posts {
  padding: 1em;
}

.row {
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  max-width: 60em;
}
</style>
