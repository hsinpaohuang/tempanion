<script setup lang="ts">
import { ionChevronDown, ionClose } from '@quasar/extras/ionicons-v7';
import type { Tem } from '~/utils/types/tem';

defineEmits([...useDialogPluginComponent.emits]);

const { dark } = useQuasar();
const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } =
  useDialogPluginComponent();
const temtemStore = useTemtemStore();

const options = ref(readonly(temtemStore.temtemList));

const selectedTem = ref<Tem | null>(null);

function filterByInput(input: string, done: (callback: () => void) => void) {
  done(() => {
    options.value = temtemStore.search(input);
  });
}

function preloadTemtemGif(option: Tem | null) {
  if (option) {
    preloadImages([option.wikiRenderAnimatedUrl]);
  }
}
</script>

<template>
  <ClientOnly>
    <QDialog ref="dialogRef" @hide="onDialogHide">
      <QCard flat :bordered="!dark.isActive">
        <QCardSection>
          <h2 class="text-h4 q-mt-md q-mb-none">Select a Temtem</h2>
        </QCardSection>
        <QCardSection>
          <QSelect
            v-model="selectedTem"
            :input-debounce="300"
            :clear-icon="ionClose"
            :dropdown-icon="ionChevronDown"
            :options="options"
            option-label="name"
            option-value="number"
            behavior="menu"
            hint="Search by Temtem name or type"
            filled
            use-input
            hide-selected
            fill-input
            clearable
            @filter="filterByInput"
            @update:model-value="preloadTemtemGif"
            @clear="selectedTem = null"
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
        </QCardSection>
        <QCardActions align="right">
          <QBtn flat color="warning" class="text-bold" @click="onDialogCancel">
            Cancel
          </QBtn>
          <QBtn
            :disable="!selectedTem"
            :color="selectedTem ? 'positive' : 'negative'"
            class="text-bold"
            flat
            @click="onDialogOK(selectedTem?.number)"
          >
            Confirm
          </QBtn>
        </QCardActions>
      </QCard>
    </QDialog>
  </ClientOnly>
</template>

<style>
.option-content {
  flex-direction: row !important;
  align-items: center;
}

.option-type-icon {
  width: 24px;
  height: 25px;
}
</style>
