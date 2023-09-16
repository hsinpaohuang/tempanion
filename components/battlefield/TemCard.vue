<script setup lang="ts">
import {
  ionReload,
  ionChevronBack,
  ionChevronForward,
} from '@quasar/extras/ionicons-v7';
import type { Place } from '~/utils/types/battlefield';
import { TemDisplayMode } from '~/utils/types/sharedTypes';

const props = defineProps<{ place: Place }>();

const { dark, dialog } = useQuasar();
const temtemStore = useTemtemStore();
const battlefieldStore = useBattlefieldStore();

const selectedTemtem = computed(
  () => temtemStore.temtemMap[battlefieldStore[props.place]],
);

const tab = ref('portrait');

function showSearchModal() {
  dialog({
    component: defineAsyncComponent(
      () => import('~/components/battlefield/SearchTemtemModal.vue'),
    ),
    componentProps: {
      mode: props.place.startsWith('friendly')
        ? TemDisplayMode.Friendly
        : TemDisplayMode.Enemy,
      selectedTemId: selectedTemtem.value.number,
    },
  }).onOk((id: number) => {
    battlefieldStore[props.place] = id;
    if (props.place.startsWith('enemy')) {
      battlefieldStore.addRecentlySelected(id);
    }
  });
}
</script>

<template>
  <QCard flat :bordered="!dark.isActive" class="column no-wrap" :class="place">
    <QCardSection class="title-row row justify-center items-center no-wrap">
      <h2 class="text-h5 text-center truncate-1 q-my-none">
        {{ selectedTemtem.name }}
      </h2>
      <div class="actions-container flex no-wrap">
        <QBtn
          flat
          dense
          :icon="ionReload"
          class="change-temtem icon q-pa-none"
          @click="showSearchModal"
        />
      </div>
    </QCardSection>
    <QCardSection
      class="portrait-container flex-1 column justify-center align-center q-pa-none"
    >
      <QTabs
        v-model="tab"
        :mobile-arrows="false"
        :left-icon="ionChevronBack"
        :right-icon="ionChevronForward"
        outside-arrows
        stretch
        dense
        class="lt-md"
      >
        <QTab name="portrait" class="tab flex-1 q-px-xs">Portrait</QTab>
        <QTab name="profile" class="tab flex-1 q-px-xs">Profile</QTab>
      </QTabs>
      <QTabPanels v-model="tab" animated class="lt-md flex-1">
        <QTabPanel name="portrait">
          <QImg
            :src="selectedTemtem.wikiRenderAnimatedUrl"
            :alt="selectedTemtem.name"
            loading="eager"
            fit="contain"
            class="portrait"
          />
        </QTabPanel>
        <QTabPanel name="profile" class="profile column no-wrap justify-evenly">
          <BattlefieldTemtemProfile :place="place" />
        </QTabPanel>
      </QTabPanels>
      <div class="desktop-layout gt-sm row items-center full-height q-pa-md">
        <QImg
          :src="selectedTemtem.wikiRenderAnimatedUrl"
          :alt="selectedTemtem.name"
          loading="eager"
          fit="contain"
          class="portrait"
        />
        <BattlefieldTemtemProfile :place="place" />
      </div>
    </QCardSection>
  </QCard>
</template>

<style scoped lang="scss">
.title-row,
.actions-container {
  gap: 8px;
}

.tab {
  width: 50%;
}

.icon {
  width: 32px;
  height: 32px;
}

.portrait-container {
  min-height: 0;
}

.portrait {
  max-width: 100%;
  max-height: 100%;
}

.profile {
  min-height: 100%;
  height: auto !important;
}

.desktop-layout {
  gap: 16px;
  > * {
    width: calc(50% - 8px);
  }
}
</style>
