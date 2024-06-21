<script setup lang="ts">
import { useUserStore } from "../../stores/user";
import { fetchy } from "../../utils/fetchy";
import { storeToRefs } from "pinia";
import { onBeforeMount, ref, watch } from "vue";
import PRViewComponent from "./PRViewComponent.vue";

const { isLoggedIn } = storeToRefs(useUserStore());

const loaded = ref(false);
const prs = ref<Array<Record<string, string>>>([]);
const props = defineProps(["PRType"]);

async function getPRs() {
  try {
    const PRResults = await fetchy(`/api/prs/ranking/${props.PRType}`, "GET", {});
    prs.value = PRResults;
  } catch (_) {
    return;
  } finally {
    loaded.value = true;
  }
}

onBeforeMount(async () => {
  await getPRs();
});

watch(
  () => props.PRType,
  async () => {
    loaded.value = false;
    await getPRs();
  },
);
</script>

<template>
  <section class="posts" v-if="loaded">
    <div class="ranking-box">
      <article v-for="(PR, index) in prs" :key="PR._id" :class="{ 'first-place': index === 0, 'second-place': index === 1, 'third-place': index === 2 }">
        <div class="medal" v-if="index === 0">🥇</div>
        <div class="medal" v-else-if="index === 1">🥈</div>
        <div class="medal" v-else-if="index === 2">🥉</div>
        <PRViewComponent :PR="PR" />
      </article>
    </div>
  </section>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap");

:root {
  --primary-color: #3498db;
  --base-bg: #f5f5f5;
  --secondary-bg: #ffffff;
  --text-color: #333;
}

body {
  font-family: "Roboto", sans-serif;
  color: var(--text-color);
  background-color: var(--base-bg);
}

.ranking-box {
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 1em;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 2em;
  margin: 2em auto;
  max-width: 800px;
  text-align: center;
}

section {
  display: flex;
  flex-direction: column;
  gap: 1em;
  padding: 1em;
}

article {
  background-color: var(--base-bg);
  border-radius: 1em;
  padding: 1.5em;
  margin-bottom: 1em;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  gap: 1em;
  position: relative;
}

.first-place {
  border: 2px solid gold;
}

.second-place {
  border: 2px solid silver;
}

.third-place {
  border: 2px solid bronze;
}

.medal {
  font-size: 2em;
  position: absolute;
  left: -2.5em;
}

.posts {
  display: flex;
  flex-direction: column;
  gap: 1em;
  padding: 1em;
}

@media (min-width: 600px) {
  .ranking-box {
    padding: 3em;
  }
}

@media (max-width: 599px) {
  .ranking-box {
    padding: 1em;
  }

  article {
    padding: 1em;
  }
}
</style>
