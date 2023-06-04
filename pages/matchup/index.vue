<script setup lang="ts">
import type { Tem } from '~/utils/types/tem';

const title = 'Matchup Search';
const description =
  'Look up which type you should use to fight against these Temtems';

useServerSeoMeta({ titleTemplate: 'Matchup Search - %s', description });

const temtemStore = useTemtemStore();
const typeImgMapStore = useTypeImgMapStore();
await Promise.all([temtemStore.initialize(), typeImgMapStore.initialize()]);

const filteredTems = ref<readonly Tem[]>(temtemStore.temtemList);
function search(key: string) {
  filteredTems.value = temtemStore.search(key);
}
</script>

<template>
  <QPage class="matchup-page column no-wrap items-center">
    <div class="title q-pb-lg">
      <h1 class="text-h3 text-center">{{ title }}</h1>
      <h2 class="text-body1 text-center">{{ description }}</h2>
      <MatchupSearchBar class="searchbar q-py-sm" @search="search" />
    </div>
    <QVirtualScroll
      v-if="filteredTems.length"
      :items="filteredTems"
      :virtual-scroll-item-size="271"
      scroll-target="body"
      class="temtem-list flex-1"
      v-slot="{ item }"
    >
      <div class="q-pb-md">
        <MatchupTemCard :tem="item" />
      </div>
    </QVirtualScroll>
    <p v-else class="text-center">No Temtems found.</p>
  </QPage>
</template>

<style scoped lang="scss">
.title,
.temtem-list {
  width: 80%;
}
</style>
