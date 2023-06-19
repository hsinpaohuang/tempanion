<script setup lang="ts">
import { ionClose, ionChevronDown, ionAdd } from '@quasar/extras/ionicons-v7';
import { TemDisplayMode } from '~/utils/types/sharedTypes';
import type { Tem } from '~/utils/types/tem';

const props = defineProps<{ mode: TemDisplayMode }>();
const selectedTem = defineModel<Tem | null>();

const battlefieldStore = useBattlefieldStore();
const temtemStore = useTemtemStore();

const options = ref(readonly(temtemStore.temtemList));

function filterByInput(input: string, done: (callback: () => void) => void) {
  done(() => {
    options.value = temtemStore.search(input);
  });
}

const canAddToTeam = computed(
  () =>
    props.mode === TemDisplayMode.Friendly &&
    selectedTem.value &&
    battlefieldStore.team.value.length < 6,
);

function addToTeam() {
  if (selectedTem.value) {
    battlefieldStore.addToTeam(selectedTem.value.number);
  }
}
</script>

<template>
  <QCardSection>
    <h3 class="text-subtitle1 q-my-sm">Search by Temtem name or type</h3>
    <QSelect
      v-model="selectedTem"
      :options="options"
      :input-debounce="300"
      :clear-icon="ionClose"
      :dropdown-icon="ionChevronDown"
      option-label="name"
      option-value="number"
      behavior="menu"
      filled
      use-input
      hide-selected
      fill-input
      clearable
      @filter="filterByInput"
    >
      <template #option="{ opt, itemProps }">
        <QItem v-bind="itemProps" class="option-content" :active="false">
          <QItemLabel class="text-body1 q-pr-sm">
            {{ opt.name }}
          </QItemLabel>
          <TypeIcon
            v-for="temType in opt.types"
            :key="temType"
            :type="temType"
            class="option-type-icon"
            @click.prevent
          />
        </QItem>
      </template>
    </QSelect>
    <QBtn
      v-if="canAddToTeam"
      :icon="ionAdd"
      flat
      dense
      no-caps
      class="q-mt-sm"
      @click="addToTeam"
    >
      Add to Team
    </QBtn>
  </QCardSection>
</template>

<style scoped>
.option-content {
  flex-direction: row !important;
  align-items: center;
}

.option-type-icon {
  width: 24px;
  height: 25px;
}
</style>
