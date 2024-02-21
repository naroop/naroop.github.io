<template>
  <pre>{{ contentOne }}</pre>
</template>

<script setup lang="ts">
import { useStore } from '@/store';
import display from '@/util/display';
import { onMounted, ref, watch } from 'vue';

const contentOne = ref('');

const c1 = `
+-+-+-+-+
|M|e|n|u|
+-+-+-+-+

 - about
 - projects
 - contact
 - resume
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
