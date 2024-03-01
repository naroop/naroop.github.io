<template>
  <pre>{{ contentOne }}</pre>
  <div class="flex flex-wrap gap-5">
    <ascii-card
      v-for="c in contentTwo"
      :key="c.title"
      :image="c.image"
      :title="c.title"
      :subtitle="c.subtitle"
      :description="c.description"
      :button-config="c.buttonConfig"
    />
  </div>
</template>

<script setup lang="ts">
import { useStore } from '@/store';
import display from '@/util/display';
import { onMounted, ref, watch } from 'vue';
import AsciiCard from '@/components/AsciiCard.vue';
import snipbit from '@/assets/snipbit.png';
import srh from '@/assets/srh.png';
import tabs from '@/assets/tabs.png';
import eoe from '@/assets/eoe.png';

interface AsciiCardConfig {
  image: string;
  title: string;
  subtitle: string;
  description: string;
  buttonConfig: Array<{ label: string; onClick: () => void }>;
}

const contentOne = ref('');
const contentTwo = ref([] as Array<AsciiCardConfig>);

const c1 = `
+-+-+-+-+-+-+-+-+
|P|r|o|j|e|c|t|s|
+-+-+-+-+-+-+-+-+

`;

const c2: Array<AsciiCardConfig> = [
  {
    image: snipbit,
    title: 'Snipbit',
    subtitle: '[Vue, TypeScript, Tailwind, PocketBase]',
    description: 'A social media platform for developers to store and share code snippets.',
    buttonConfig: [
      { label: 'More Info', onClick: () => window.open('https://devpost.com/software/snipbit-sc0au4', '_blank') },
      { label: 'Try it Out', onClick: () => window.open('https://snipbit.pockethost.io/#/', '_blank') }
    ]
  },
  {
    image: srh,
    title: 'Stardew Relationship Helper',
    subtitle: '[Vue, TypeScript, Tailwind]',
    description: 'An interactive web application for users to track relationships in Stardew Valley.',
    buttonConfig: [
      { label: 'More Info', onClick: () => window.open('https://github.com/gimgine/stardew-relationship-helper', '_blank') },
      { label: 'Try it Out', onClick: () => window.open('https://gimgine.github.io/stardew-relationship-helper/#/tracker', '_blank') }
    ]
  },
  {
    image: tabs,
    title: 'Tabs',
    subtitle: '[React Native, MongoDB, Express.js]',
    description: 'An iOS application targeting drunk driving prevention and nightlife safety.',
    buttonConfig: [{ label: 'More Info', onClick: () => window.open('https://devpost.com/software/tabs-sc6dxz', '_blank') }]
  },
  {
    image: eoe,
    title: 'Echoes of Existence',
    subtitle: '[Godot, GDScript]',
    description: 'A 2D top-down game where players find and scan plants while fighting off hordes of aliens.',
    buttonConfig: [{ label: 'More Info', onClick: () => window.open('https://naroop.itch.io/echoes-of-existence', '_blank') }]
  }
];

const showContent = async () => {
  await display(c1, contentOne);
  for (let i = 0; i < c2.length; i++) {
    setTimeout(() => {
      contentTwo.value.push(c2[i]);
    }, i * 7000);
  }
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
