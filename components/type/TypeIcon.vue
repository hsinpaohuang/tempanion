<script setup lang="ts">
import type { TemTemType } from '@maael/temtem-types';

withDefaults(
  defineProps<{
    type: TemTemType;
    width?: HTMLImageElement['width'];
    height?: HTMLImageElement['height'];
    loading?: HTMLImageElement['loading'];
  }>(),
  { width: 55, height: 55, loading: 'eager' },
);

const typeImgMap = useTypeImgMapStore();
</script>

<template>
  <div v-once class="row items-center">
    <img
      :src="typeImgMap.map[type]"
      :alt="type"
      :width="width"
      :height="height"
      :loading="loading"
      class="type-icon full-width"
      @contextmenu.prevent
    />
    <QTooltip
      class="text-body2"
      :hide-delay="300"
      anchor="top middle"
      self="bottom middle"
      :offset="[10, 10]"
      transition-show="jump-up"
      transition-hide="jump-down"
    >
      {{ type }}
    </QTooltip>
  </div>
</template>

<style scoped>
.type-icon {
  object-fit: contain;
  max-width: 100%;
  max-height: 100%;
}
</style>
