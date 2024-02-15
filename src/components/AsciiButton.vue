<template>
  <button
    :class="['leading-snug transition-opacity duration-75', isMouseDown ? 'opacity-50' : 'hover:opacity-80']"
    @click="$emit('click')"
    @mousedown="toggleMouseDown"
    @mouseup="toggleMouseDown"
  >
    <pre>{{ buttonContent }}</pre>
  </button>
</template>

<script setup lang="ts">
import display from '@/util/display';
import { onMounted, ref } from 'vue';

const props = defineProps({ label: { type: String, required: true }, manualDisplay: { type: Boolean, default: false } });
defineEmits<{ (e: 'click'): void }>();

const buttonContent = ref('');
const isMouseDown = ref(false);

defineExpose({
  display: () => display(buildButtonContent(props.label), buttonContent, 50)
});

const buildButtonContent = (text: string) => {
  const l = text.length;
  let content = '';

  // top row
  content += ',--';
  for (let i = 0; i < l; i++) {
    content += '-';
  }
  content += '--,\n';

  // second row
  content += `|  ${text}  |\n`;

  //third row
  content += "'--";
  for (let i = 0; i < l; i++) {
    content += '-';
  }
  content += "--'\n";

  return content;
};

const toggleMouseDown = () => {
  isMouseDown.value = !isMouseDown.value;
};

onMounted(() => {
  if (!props.manualDisplay) {
    display(buildButtonContent(props.label), buttonContent, 50);
  }
});
</script>
