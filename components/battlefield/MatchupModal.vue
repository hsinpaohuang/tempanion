<script setup lang="ts">
import type { Weakness } from '~/utils/types/tem';
import type { TemDisplayMode } from '~/utils/types/sharedTypes';

const props = defineProps<{
  name: string;
  weaknesses: Readonly<Weakness[]>;
  mode: TemDisplayMode;
}>();

defineEmits([...useDialogPluginComponent.emits]);

const { dark } = useQuasar();
const { dialogRef, onDialogHide, onDialogCancel } = useDialogPluginComponent();
</script>

<template>
  <ClientOnly>
    <QDialog ref="dialogRef" @hide="onDialogHide">
      <QCard flat :bordered="!dark.isActive" class="flex-1 no-padding">
        <QCardSection>
          <MatchupList v-bind="props" />
        </QCardSection>
        <QCardActions align="right">
          <QBtn flat @click="onDialogCancel">Close</QBtn>
        </QCardActions>
      </QCard>
    </QDialog>
  </ClientOnly>
</template>
