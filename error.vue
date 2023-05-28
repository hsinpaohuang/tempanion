<template>
  <div class="column flex-center full-width">
    <h1 v-if="error?.statusCode === 404" class="text-h1 mb-3">404</h1>
    <template v-else>
      <h1 class="text-h1 mb-3">Error</h1>
      <p>{{ error?.statusMessage }}</p>
    </template>
    <NuxtLink to="/">Go back</NuxtLink>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  error?: { statusCode: number; statusMessage: string; message: string };
}>();
if (process.dev) {
  console.error(props.error?.message);
}
</script>
