<script setup lang="ts">
import { ionSearchOutline, ionCloseOutline } from '@quasar/extras/ionicons-v7';

const emits = defineEmits<{ search: [string] }>();

const router = useRouter();
const route = useRoute();

const searchText = computed({
  get: () => String(route.query.search || ''),
  set: newText => {
    router.push({ query: newText ? { search: newText } : undefined });
  },
});

const onSearch = (keyword: string | number | null) => {
  emits('search', String(keyword || ''));
};

onMounted(() => {
  if (route.query.search) {
    emits('search', String(route.query.search));
  } else {
    router.replace({ query: undefined });
  }
});
</script>

<template>
  <QInput
    v-model="searchText"
    :debounce="300"
    type="search"
    placeholder="Search by name or type"
    :clear-icon="ionCloseOutline"
    clearable
    filled
    @update:model-value="onSearch"
    @clear="searchText = ''"
  >
    <template v-slot:append>
      <QIcon :name="ionSearchOutline" />
    </template>
  </QInput>
</template>
