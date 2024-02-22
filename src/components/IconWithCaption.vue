<template>
  <div class="flex items-center gap-2">
    <img :src="image" :class="['w-10 h-auto transition-opacity duration-700', showImage ? 'opacity-100' : 'opacity-0']" />
    <span>{{ captionText }}</span>
  </div>
</template>

<script setup lang="ts">
import display from '@/util/display';
import { ref, onMounted } from 'vue';

const props = defineProps<{ image: string; caption: string }>();

const captionText = ref('');
const showImage = ref(false);

onMounted(async () => {
  await display(props.caption, captionText, 25, false);
  showImage.value = true;
});
</script>
