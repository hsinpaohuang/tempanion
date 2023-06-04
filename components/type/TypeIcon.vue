<script setup lang="ts">
import type { TemTemType } from '@maael/temtem-types';

defineProps<{ type: TemTemType }>();

const typeImgMap = useTypeImgMapStore();
</script>

<template>
  <div v-once class="row items-center">
    <img
      :src="typeImgMap[type]"
      alt="type"
      width="55"
      height="55"
      class="type-icon full-width"
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
