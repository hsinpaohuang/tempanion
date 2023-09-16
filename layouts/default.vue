<script setup lang="ts">
import {
  ionMenu,
  ionSearch,
  ionMoon,
  ionSunny,
  ionArrowUp,
} from '@quasar/extras/ionicons-v7';
import { mdiSwordCross } from '@quasar/extras/mdi-v7';
import { debounce } from 'quasar';

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

const { dark } = useQuasar();
const router = useRouter();

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

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

const hasScrolled = useState(() => false);
if (process.client) {
  const onScroll = debounce(() => {
    hasScrolled.value = window.scrollY > 500;
  }, 200);
  window.addEventListener('scroll', onScroll, { passive: true });

  // for testing
  onMounted(() => {
    Object.assign(window, { isMounted: true });
  });

  onBeforeUnmount(() => {
    window.removeEventListener('scroll', onScroll);
  });
}

const menuItems = [
  { title: 'Matchup Search', icon: ionSearch, path: '/matchup' },
  { title: 'Battlefield', icon: mdiSwordCross, path: '/battlefield' },
];
</script>

<template>
  <QLayout view="hHh Lpr lff">
    <QHeader elevated class="header">
      <QToolbar>
        <QBtn
          flat
          round
          dense
          :icon="ionMenu"
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
      :mini="miniState"
      @mouseover="miniState = false"
      @mouseout="miniState = true"
      :width="250"
      :breakpoint="500"
      bordered
      show-if-above
      mini-to-overlay
      :class="$q.dark.isActive ? 'bg-grey-10' : 'bg-grey-4'"
      class="nav-menu"
    >
      <QScrollArea :horizontal-thumb-style="{ opacity: '0' }" class="fit">
        <QList padding>
          <QItem
            v-for="item in menuItems"
            :key="item.path"
            v-ripple
            active-class="text-deep-purple-4"
            clickable
            @click="goTo(router, item.path)"
          >
            <QItemSection avatar>
              <QIcon :name="item.icon" class="nav-icon" />
            </QItemSection>
            <QItemSection class="nav-text">{{ item.title }}</QItemSection>
          </QItem>
        </QList>
      </QScrollArea>
    </QDrawer>

    <QPageContainer class="default-page">
      <RouterView v-slot="{ Component }">
        <transition
          mode="out-in"
          enter-active-class="animated fadeIn"
          leave-active-class="animated fadeOut"
        >
          <component :is="Component" />
        </transition>
      </RouterView>
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
@media screen and (min-width: 501px) {
  .header {
    z-index: 3001;
  }
}

.default-page {
  height: 100vh;
}

.dark-mode-toggle :deep(.q-toggle__track) {
  opacity: 1 !important;
}
</style>
