<script setup lang="ts">
import {
  ionMenuOutline,
  ionSearchOutline,
  ionMoon,
  ionSunny,
} from '@quasar/extras/ionicons-v7';

const { dark } = useQuasar();

const showDrawer = useState(() => false);
const miniState = useState(() => true);

const isDarkMode = computed({
  get: () => dark.isActive,
  set: mode => {
    dark.set(mode);
    localStorage.setItem('dark', mode ? '1' : '0');
  },
});

// initialize quasar's dark mode setting
if (process.client) {
  const storedDarkMode = localStorage.getItem('dark');
  if (storedDarkMode !== null) {
    dark.set(storedDarkMode === '1');
  }
}

const color = computed(() => (isDarkMode.value ? 'indigo' : 'amber'));

// for preventing FOUC
useHead({
  script: [
    {
      children: `
      const dark = localStorage.getItem('dark');
      if (dark !== null) {
        document.body.classList.add(dark === '1' ? 'body--dark' : 'body--light');
      } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.body.classList.add('body--dark');
      }
      `,
      tagPosition: 'bodyOpen',
    },
  ],
});
</script>

<template>
  <QLayout view="hHh Lpr lff">
    <QHeader elevated>
      <QToolbar>
        <QBtn
          flat
          round
          dense
          :icon="ionMenuOutline"
          @click="showDrawer = !showDrawer"
        />
        <QToolbarTitle>Tempanion</QToolbarTitle>
        <QToggle
          v-model="isDarkMode"
          class="dark-mode-toggle"
          :checked-icon="ionMoon"
          :unchecked-icon="ionSunny"
          :color="color"
          size="lg"
          keep-color
        />
      </QToolbar>
    </QHeader>

    <QDrawer
      v-model="showDrawer"
      show-if-above
      :mini="miniState"
      @mouseover="miniState = false"
      @mouseout="miniState = true"
      :width="200"
      :breakpoint="500"
      bordered
      :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-3'"
    >
      <QScrollArea class="fit" :horizontal-thumb-style="{ opacity: '0' }">
        <QList padding>
          <QItem clickable v-ripple>
            <QItemSection avatar>
              <QIcon :name="ionSearchOutline" />
            </QItemSection>
            <QItemSection>Matchup</QItemSection>
          </QItem>
        </QList>
      </QScrollArea>
    </QDrawer>

    <QPageContainer class="default-page">
      <NuxtPage class="page" />
    </QPageContainer>
  </QLayout>
</template>

<style scoped lang="scss">
.default-page {
  height: 100vh;
  :deep(.page) {
    height: 100%;
  }
}

a {
  text-decoration: none;
  color: inherit;
}

.dark-mode-toggle :deep(.q-toggle__track) {
  opacity: 1 !important;
}
</style>
