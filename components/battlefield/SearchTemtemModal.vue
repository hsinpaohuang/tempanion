<script setup lang="ts">
import { TemDisplayMode } from '~/utils/types/sharedTypes';
import type { Tem } from '~/utils/types/tem';

const props = defineProps<{ mode: TemDisplayMode; selectedTemId: number }>();
defineEmits([...useDialogPluginComponent.emits]);

const { dark } = useQuasar();
const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } =
  useDialogPluginComponent();
const temtemStore = useTemtemStore();

const selectedTem = ref<Tem | null>(temtemStore.temtemMap[props.selectedTemId]);
watch(
  () => selectedTem.value,
  () => {
    if (selectedTem.value) {
      preloadImages([selectedTem.value.wikiRenderAnimatedUrl]);
    }
  },
);
</script>

<template>
  <ClientOnly>
    <QDialog ref="dialogRef" @hide="onDialogHide">
      <QCard class="search-temtem-modal" :bordered="!dark.isActive" flat>
        <QCardSection>
          <h2 class="text-h4 q-mt-md q-mb-none text-center">Select a Temtem</h2>
        </QCardSection>
        <BattlefieldSearchSelect v-model="selectedTem" :mode="mode" />
        <BattlefieldRecentlySelected
          v-if="mode === TemDisplayMode.Enemy"
          v-model="selectedTem"
          class="q-pt-none"
        />
        <BattlefieldTeamTemtems
          v-if="mode === TemDisplayMode.Friendly"
          v-model="selectedTem"
        />
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

<style scoped>
.search-temtem-modal {
  max-width: 80vw;
}
</style>
