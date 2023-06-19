<script setup lang="ts">
import { Tem } from '~/utils/types/tem';

const selectedTem = defineModel<Tem | null>();

const battlefieldStore = useBattlefieldStore();
const temtemStore = useTemtemStore();
</script>

<template>
  <QCardSection v-if="battlefieldStore.recentlySelected.value.length">
    <h3 class="text-subtitle1 q-my-sm">Recently selected Temtems</h3>
    <div class="recently-selected-list row">
      <BattlefieldTemtemAvatar
        v-for="id in battlefieldStore.recentlySelected.value"
        :id="id"
        :key="id"
        @select="selectedTem = temtemStore.temtemMap[id]"
      />
    </div>
  </QCardSection>
</template>

<style scoped>
.recently-selected-list {
  gap: 16px;
}
</style>
