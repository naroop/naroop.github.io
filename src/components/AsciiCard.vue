<template>
  <div class="w-[423.85px] flex flex-col items-center">
    <pre>{{ topText }}</pre>
    <div class="flex flex-col px-2 items-center">
      <img :src="image" :class="['h-auto transition-opacity w-96', showImage ? 'opacity-100' : 'opacity-0']" />
      <pre class="font-bold mt-2">{{ titleText }}</pre>
      <pre class="whitespace-pre-wrap">{{ subtitleText }}</pre>
      <pre class="whitespace-pre-wrap px-3">

{{ descriptionText }}
    </pre
      >
    </div>
    <div class="flex justify-center gap-14">
      <ascii-button ref="buttonOne" :label="buttonConfig[0].label" manual-display @click="buttonConfig[0].onClick" />
      <ascii-button v-if="buttonConfig.length === 2" ref="buttonTwo" :label="buttonConfig[1].label" manual-display @click="buttonConfig[1].onClick" />
    </div>

    <pre>{{ bottomText }}</pre>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import AsciiButton from './AsciiButton.vue';
import display from '@/util/display';

const buttonOne = ref<InstanceType<typeof AsciiButton>>();
const buttonTwo = ref<InstanceType<typeof AsciiButton>>();

const props = defineProps<{
  image: string;
  title: string;
  subtitle: string;
  description: string;
  buttonConfig: Array<{ label: string; onClick: () => void }>;
  manualDisplay?: boolean;
}>();

const topText = ref('');
const titleText = ref('');
const subtitleText = ref('');
const descriptionText = ref('');
const bottomText = ref('');
const showImage = ref(false);

const top = `,--------------------------------------,`;
const bottom = `'--------------------------------------'`;

// defineExpose({
//   display: () => display(buildButtonContent(props.label), buttonContent, 50, false)
// });

const displayCard = async () => {
  display(top, topText, 25, false);
  await display(bottom, bottomText, 25, false);

  showImage.value = true;

  await display(props.title, titleText);
  await display(props.subtitle, subtitleText);
  await display(props.description, descriptionText);

  buttonOne.value?.display();
  buttonTwo.value?.display();
};

onMounted(() => {
  if (!props.manualDisplay) {
    displayCard();
  }
});
</script>
