<script setup lang="ts">
import {
  ionMenuOutline,
  ionSearchOutline,
  ionMoon,
  ionSunny,
  ionArrowUp,
} from '@quasar/extras/ionicons-v7';
import { debounce } from 'quasar';

const { dark } = useQuasar();

const showDrawer = useState(() => false);
const miniState = useState(() => false);

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

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

const hasScrolled = useState(() => false);
if (process.client) {
  const onScroll = debounce(() => {
    hasScrolled.value = window.scrollY > 500;
  }, 200);
  window.addEventListener('scroll', onScroll, { passive: true });

  onBeforeUnmount(() => {
    window.removeEventListener('scroll', onScroll);
  });
}

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

    <!-- TODO: add show-if-above when there are other pages to navigate to -->
    <QDrawer
      v-model="showDrawer"
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

    <QPageContainer class="default-page column">
      <NuxtPage class="page" />
      <transition
        appear
        enter-active-class="animated fadeIn"
        leave-active-class="animated fadeOut"
      >
        <QPageSticky
          v-show="hasScrolled"
          position="bottom-right"
          :offset="[18, 18]"
        >
          <QBtn fab color="accent" :icon="ionArrowUp" @click="scrollToTop" />
        </QPageSticky>
      </transition>
    </QPageContainer>
  </QLayout>
</template>

<style scoped lang="scss">
.default-page {
  height: 100vh;
}

a {
  text-decoration: none;
  color: inherit;
}

.dark-mode-toggle :deep(.q-toggle__track) {
  opacity: 1 !important;
}
</style>
