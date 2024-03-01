<template>
  <pre class="whitespace-pre-wrap">{{ contentOne }}</pre>
</template>

<script setup lang="ts">
import { useStore } from '@/store';
import display from '@/util/display';
import { onMounted, ref, watch } from 'vue';

const contentOne = ref('');

const c1 = `
Hello! Welcome to my portfolio website. Pretend you are an 80's hacker while you navigate the site.

Type "menu" below, then press enter.
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
