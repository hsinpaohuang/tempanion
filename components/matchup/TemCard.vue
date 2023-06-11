<script setup lang="ts">
import { Tem } from '~/utils/types/tem';

const { dark } = useQuasar();

defineProps<{ tem: Tem }>();
</script>

<template>
  <QCard flat :bordered="!dark.isActive">
    <QItem class="items-center q-pa-md">
      <QAvatar size="55px" class="q-mr-md">
        <img
          :src="tem.portraitWikiUrl"
          :alt="tem.name"
          width="55"
          height="55"
        />
      </QAvatar>
      <h3 class="text-h5 q-ma-none q-mr-sm">{{ tem.name }}</h3>
      <TypeIcon v-for="temType in tem.types" :key="temType" :type="temType" />
    </QItem>
    <QSeparator />
    <QItem class="q-pb-md">
      <MatchupList :name="tem.name" :weaknesses="tem.weaknesses" mode="enemy" />
    </QItem>
  </QCard>
</template>
