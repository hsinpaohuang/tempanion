<script lang="ts">
const weaknessClassMap: Readonly<Record<string, string>> = Object.freeze({
  4: 'bg-w-4',
  2: 'bg-w-2',
  0.5: 'bg-w-05',
  0.25: 'bg-w-025',
});
</script>

<script setup lang="ts">
import { Weakness } from '~/utils/types/tem';

const props = defineProps<{ weaknesses: Readonly<Weakness[]> }>();

const uses = computed(() => props.weaknesses.filter(w => w[1] > 1));
const avoids = computed(() => props.weaknesses.filter(w => w[1] < 1));
const getWeaknessClass = (weakness: number) =>
  weaknessClassMap[String(weakness)];
</script>

<template>
  <div class="matchup-list row full-width">
    <div v-if="uses.length" class="uses column flex-1">
      <p class="text-h6 text-center">Attack with</p>
      <div class="weakness-row row justify-evenly rounded-borders">
        <div
          v-for="weakness in uses"
          :key="weakness[0]"
          :class="getWeaknessClass(weakness[1])"
          class="weakness-block column flex-center flex-1 q-py-sm"
        >
          <TypeIcon :type="weakness[0]" />
          <QBadge
            color="dark"
            rounded
            class="modifier text-body2 justify-center"
          >
            {{ weakness[1] }}x
          </QBadge>
        </div>
      </div>
    </div>
    <QSeparator v-if="uses.length && avoids.length" vertical />
    <div v-if="avoids.length" class="avoids column flex-1">
      <p class="text-h6 text-center">Avoid Using</p>
      <div class="weakness-row row justify-evenly rounded-borders">
        <div
          v-for="weakness in avoids"
          :key="weakness[0]"
          :class="getWeaknessClass(weakness[1])"
          class="weakness-block column flex-center flex-1 q-py-sm"
        >
          <TypeIcon :type="weakness[0]" />
          <QBadge
            color="dark"
            rounded
            class="modifier text-body2 justify-center"
          >
            {{ weakness[1] }}x
          </QBadge>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.matchup-list {
  gap: 8px;
}

.weakness-block {
  gap: 8px;
}

.modifier {
  min-width: 50px;
}

.bg-w-4 {
  background-color: #3eb23e;
}

.bg-w-2 {
  background-color: #559955;
}

.bg-w-05 {
  background-color: #a3a318;
}

.bg-w-025 {
  background-color: #cc4b14;
}
</style>
