<template>
  <pre>{{ contentOne }}</pre>
</template>

<script setup lang="ts">
import { useStore } from '@/store';
import display from '@/util/display';
import { onMounted, ref, watch } from 'vue';

const contentOne = ref('');

const c1 = `
phone number: (417) 861-3406
email: nrupp815@outlook.com
`;

const showContent = () => {
  display(c1, contentOne);
};

onMounted(() => {
  if (useStore().doneDisplayingHeader) {
    showContent();
  } else {
    const unwatch = watch(
      () => useStore().doneDisplayingHeader,
      (newValue) => {
        if (newValue) {
          showContent();
          unwatch();
        }
      }
    );
  }
});
</script>
