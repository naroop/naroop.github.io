<template>
  <pre class="whitespace-pre-wrap">{{ contentOne }}</pre>
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

 (1) about
 (2) projects
 (3) contact
 (4) resume

Type a selection below, then press enter.
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
