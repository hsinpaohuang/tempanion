<script setup lang="ts">
import { TemTemType } from '@maael/temtem-types';
import { ionReload, ionWarning } from '@quasar/extras/ionicons-v7';

const { dark } = useQuasar();
</script>

<template>
  <QCard flat :bordered="!dark.isActive" class="column no-wrap">
    <QCardSection class="title-row row justify-center items-center no-wrap-md">
      <h2 class="text-h5 text-center truncate-1 q-my-none">
        {{ fakeData.name }}
      </h2>
      <TypeIcon
        v-for="temType in fakeData.types"
        :key="temType"
        :type="(temType as TemTemType)"
        class="icon"
      />
      <div class="actions-container flex no-wrap">
        <div class="tooltip-container">
          <QIcon :name="ionWarning" color="negative" class="icon" />
          <QTooltip class="text-body2">Test</QTooltip>
        </div>
        <QBtn flat dense :icon="ionReload" class="icon q-pa-none" />
      </div>
    </QCardSection>
    <QCardSection class="portrait-container flex justify-center align-center">
      <img
        :src="fakeData.wikiRenderAnimatedUrl"
        :alt="fakeData.name"
        class="portrait"
      />
    </QCardSection>
  </QCard>
</template>

<style scoped>
.title-row,
.actions-container {
  gap: 8px;
}

.icon {
  width: 32px;
  height: 32px;
}

.portrait-container {
  min-height: 0;
}

.portrait {
  object-fit: contain;
  max-width: 100%;
  max-height: 100%;
}
</style>
