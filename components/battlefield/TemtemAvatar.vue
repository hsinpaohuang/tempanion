<script setup lang="ts">
const props = defineProps<{ id: number }>();
const emits = defineEmits<{ select: [number] }>();

const temtemStore = useTemtemStore();

const selectedTemtem = computed(() => {
  const tem = temtemStore.temtemMap[props.id];
  if (!tem) {
    console.warn(`Invalid Temtem ID: ${props.id}`);
    return;
  }

  return tem;
});
</script>

<template>
  <QBtn v-if="selectedTemtem" flat no-caps @click="emits('select', id)">
    <div class="column items-center cursor-pointer">
      <QAvatar size="lg">
        <QImg
          :src="selectedTemtem.portraitWikiUrl"
          :alt="selectedTemtem.name"
          size="lg"
          ratio="1"
        />
      </QAvatar>
      <div class="row justify-center items-center q-pt-xs">
        <span>{{ selectedTemtem.name }}</span>
        <slot name="actions" />
      </div>
    </div>
  </QBtn>
</template>
