<script setup lang="ts">
import { Weakness } from '~/utils/types/tem';
const weaknessClassMap: Readonly<Record<string, string>> = Object.freeze({
  4: 'bg-w-4',
  2: 'bg-w-2',
  0.5: 'bg-w-05',
  0.25: 'bg-w-025',
});

const props = defineProps<{
  name: string;
  weaknesses: Readonly<Weakness[]>;
  mode: 'enemy' | 'friendly';
}>();

const matchupTitle = computed(
  () =>
    `${props.name} as ${props.mode === 'enemy' ? 'an' : 'a'} ${
      props.mode
    } is...`,
);

const calculatedWeaknesses = computed(() =>
  props.mode === 'enemy'
    ? props.weaknesses
    : props.weaknesses.map<Weakness>(w => [w[0], 1 / w[1]]).reverse(),
);
const uses = computed(() => calculatedWeaknesses.value.filter(w => w[1] > 1));
const usesText = computed(() =>
  props.mode === 'enemy' ? 'Weak against' : 'Strong against',
);

const avoids = computed(() => calculatedWeaknesses.value.filter(w => w[1] < 1));
const avoidsText = computed(() =>
  props.mode === 'enemy' ? 'Strong against' : 'Weak against',
);

function getWeaknessClass(weakness: number) {
  return weaknessClassMap[String(weakness)];
}
</script>

<template>
  <div class="column full-width">
    <h3 class="text-h6 text-center q-mt-none q-mb-md">{{ matchupTitle }}</h3>
    <div class="matchup-list full-width row">
      <div v-if="uses.length" class="uses column flex-1">
        <p class="text-h6 text-center">{{ usesText }}</p>
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
        <p class="text-h6 text-center">{{ avoidsText }}</p>
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
