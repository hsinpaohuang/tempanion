<script setup lang="ts">
import { useTypeImgMap } from '~/composables/useTypeImgMap';
import { TemtemFactory } from '~/utils/factories/TemtemFactory';
import type { CondensedApiTem, Tem } from '~/utils/types/tem';

const params = new URLSearchParams({
  weaknesses: 'true',
  fields: ['name', 'portraitWikiUrl', 'types'].join(','),
});

const [{ data: tems }, typeImgMap] = await Promise.all([
  useFetch<CondensedApiTem[], Error, string, 'get', CondensedApiTem[], Tem[]>(
    `https://temtem-api.mael.tech/api/temtems?${params.toString()}`,
    { transform: data => data.map(d => TemtemFactory.convert(d)) },
  ),
  useTypeImgMap(),
]);

if (!tems.value) {
  throw new Error('Failed to fetch Tems');
}

provide(typeKey, typeImgMap);

const { result: filteredTems, search } = useSearch(tems.value, {
  keys: [{ name: 'name' }, { name: 'types', weight: 0.1 }],
  threshold: 0.3,
});
</script>

<template>
  <QPage class="matchup-page column no-wrap items-center">
    <div class="title q-pb-lg">
      <h1 class="text-h3 text-center">Matchup Search</h1>
      <h2 class="text-body1 text-center">
        Look up which type you should use to fight against these Temtems
      </h2>
      <TemSearchBar class="searchbar q-py-sm" @search="search" />
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
        <TemCard :tem="item" />
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
