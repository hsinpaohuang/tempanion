<script setup lang="ts">
const title = 'Battlefield Layout';

useServerSeoMeta({ titleTemplate: 'Battlefield Layout - %s' });

await useTypeImgMapStore().initialize();
</script>

<template>
  <QPage
    class="column no-wrap items-center full-height q-mx-sm q-mx-md-xl q-pb-xl"
  >
    <h1 class="text-h3 text-center">{{ title }}</h1>
    <div class="battlefield full-width flex-1">
      <div class="column no-wrap">
        <h3 class="text-h5 text-center">Enemy 1</h3>
        <BattlefieldTemCard />
      </div>
      <div class="column no-wrap">
        <h3 class="text-h5 text-center">Enemy 2</h3>
        <BattlefieldTemCard />
      </div>
      <div class="column no-wrap">
        <h3 class="text-h5 text-center">Friendly 1</h3>
        <BattlefieldTemCard />
      </div>
      <div class="column no-wrap">
        <h3 class="text-h5 text-center">Friendly 2</h3>
        <BattlefieldTemCard />
      </div>
    </div>
  </QPage>
</template>

<style scoped lang="scss">
@import 'quasar/src/css/variables';

.battlefield {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 8px;
  min-width: 0;
  min-height: 0;
  @media (min-width: $breakpoint-sm-min) {
    gap: 16px;
  }

  .column {
    min-width: 0;
    overflow: hidden;
  }
}
</style>
