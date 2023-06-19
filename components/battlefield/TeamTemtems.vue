<script setup lang="ts">
import { ionClose } from '@quasar/extras/ionicons-v7';
import { Tem } from '~/utils/types/tem';

const selectedTem = defineModel<Tem | null>();

const battlefieldStore = useBattlefieldStore();
const temtemStore = useTemtemStore();
</script>

<template>
  <QCardSection v-if="battlefieldStore.team.value.length">
    <h3 class="text-subtitle1 q-my-sm">Or Select From Your Team</h3>
    <div class="team-list row">
      <BattlefieldTemtemAvatar
        v-for="(id, index) in battlefieldStore.team.value"
        :id="id"
        :key="index"
        @select="selectedTem = temtemStore.temtemMap[id]"
      >
        <template #actions>
          <QBtn
            :icon="ionClose"
            size="sm"
            class="q-pa-xs"
            flat
            dense
            @click.stop="battlefieldStore.setTeamMember(index, undefined)"
          />
        </template>
      </BattlefieldTemtemAvatar>
    </div>
  </QCardSection>
</template>

<style scoped>
.team-list {
  gap: 16px;
}
</style>
