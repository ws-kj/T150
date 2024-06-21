<script setup lang="ts">
import { useUserStore } from "../../stores/user";
import { fetchy } from "../../utils/fetchy";
import { storeToRefs } from "pinia";
import { onBeforeMount, ref } from "vue";

const { isLoggedIn } = storeToRefs(useUserStore());

const loaded = ref(false);
let prs = ref<Array<Record<string, string>>>([]);

async function getPRs() {
  let PRResults;
  try {
    PRResults = await fetchy("/api/prs/twok", "GET", {});
  } catch (_) {
    return;
  }
  prs.value = PRResults;
}

onBeforeMount(async () => {
  await getPRs();
  loaded.value = true;
});
</script>

<template>
  <section class="posts" v-if="loaded">
    <article v-for="pr in prs" :key="pr._id">
      <TwoKComponent :pr="pr" />
    </article>
  </section>
</template>

<style scoped>
:root {
  --primary-color: #3498db;
  --base-bg: #f5f5f5;
  --secondary-bg: #ffffff;
  --text-color: #333;
}

body {
  font-family: Arial, sans-serif;
  color: var(--text-color);
}

section {
  display: flex;
  flex-direction: column;
  gap: 1em;
  margin: 1em auto;
  padding: 1em;
  background-color: var(--secondary-bg);
  border-radius: 1em;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.create-post {
  max-width: 600px;
  margin: 0 auto 2em;
  padding: 1.5em;
}

.row {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  max-width: 60em;
}

.row h2 {
  margin: 0.5em 0;
}

article {
  background-color: var(--base-bg);
  border-radius: 1em;
  padding: 1.5em;
  margin-bottom: 1em;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.posts {
  display: flex;
  flex-direction: column;
  gap: 1em;
  padding: 1em;
}

@media (min-width: 600px) {
  .row {
    flex-direction: row;
    justify-content: space-between;
  }

  .create-post,
  .posts {
    margin-top: 2em;
  }
}

@media (max-width: 599px) {
  .create-post {
    padding: 1em;
  }

  article {
    padding: 1em;
  }
}
</style>
