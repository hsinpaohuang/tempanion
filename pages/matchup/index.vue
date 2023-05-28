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

provide(typeKey, typeImgMap);
</script>

<template>
  <QPage>
    <QVirtualScroll
      :items="tems || []"
      :virtual-scroll-item-size="271"
      class="matchup-list full-height q-pt-xl"
      v-slot="{ item }"
    >
      <div class="q-pb-md">
        <TemCard :tem="item" class="tem-card q-ma-auto" />
      </div>
    </QVirtualScroll>
  </QPage>
</template>

<style scoped lang="scss">
.tem-card {
  width: 80%;
  margin: auto;
}
</style>
