<script setup lang="ts">
import { ionInformationCircleOutline } from '@quasar/extras/ionicons-v7';
import type { Place } from '~/utils/types/battlefield';
import { TemDisplayMode } from '~/utils/types/sharedTypes';

const props = defineProps<{ place: Place }>();

const { dialog } = useQuasar();
const temtemStore = useTemtemStore();
const battlefieldStore = useBattlefieldStore();

const selectedTemtem = computed(
  () => temtemStore.temtemMap[battlefieldStore[props.place]],
);

const techniqueTypes = computed(() =>
  temtemStore.getTechniqueTypesOfTemtem(selectedTemtem.value.number),
);

function showMatchupModal() {
  dialog({
    component: defineAsyncComponent(
      () => import('~/components/battlefield/MatchupModal.vue'),
    ),
    componentProps: {
      name: selectedTemtem.value.name,
      weaknesses: selectedTemtem.value.weaknesses,
      mode: props.place.startsWith('friendly')
        ? TemDisplayMode.Friendly
        : TemDisplayMode.Enemy,
    },
  });
}
</script>

<template>
  <div class="profile column no-wrap justify-evenly full-height">
    <div class="temtem-type row items-center no-wrap">
      <span class="text-subtitle1">Types:</span>
      <div class="row no-wrap">
        <TypeIcon
          v-for="temType in selectedTemtem.types"
          :key="temType"
          :type="temType"
          :height="30"
          loading="lazy"
        />
      </div>
      <QIcon
        :name="ionInformationCircleOutline"
        class="text-h6 cursor-pointer"
        @click="showMatchupModal"
      />
    </div>
    <QSeparator />
    <div class="row items-center">
      <span class="text-subtitle1 q-pr-sm">Possible technique types:</span>
      <TypeIcon
        v-for="techniqueType in techniqueTypes"
        :key="techniqueType"
        :type="techniqueType"
        :height="30"
        loading="lazy"
      />
    </div>
  </div>
</template>

<style>
.profile,
.temtem-type {
  gap: 8px;
}
</style>
