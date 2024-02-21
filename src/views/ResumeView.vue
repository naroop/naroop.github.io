<template>
  <pre>{{ contentOne }}</pre>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import resume from '@/assets/nathanielresume.pdf';
import display from '@/util/display';
import { useStore } from '@/store';

const contentOne = ref('');

const c1 = `
Opening resume in another tab...
`;

const showContent = () => {
  display(c1, contentOne);
};

onMounted(() => {
  if (useStore().doneDisplayingHeader) {
    showContent();
    window.open(resume, '_blank');
  } else {
    const unwatch = watch(
      () => useStore().doneDisplayingHeader,
      (newValue) => {
        if (newValue) {
          showContent();
          window.open(resume, '_blank');
          unwatch();
        }
      }
    );
  }
});
</script>
