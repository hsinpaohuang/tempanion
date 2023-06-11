<script setup lang="ts">
import type { TemTemType } from '@maael/temtem-types';

withDefaults(
  defineProps<{
    type: TemTemType;
    width?: number;
    height?: number;
    loading?: 'eager' | 'lazy';
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
    <QTooltip class="text-body2" :hide-delay="300">
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
