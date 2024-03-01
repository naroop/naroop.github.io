<template>
  <pre class="whitespace-pre-wrap">{{ contentOne }}</pre>
  <div class="grid grid-cols-2 md:grid-cols-5 gap-y-4">
    <div v-for="c in contentTwo" :key="c.image" class="flex flex-col items-start gap-1">
      <icon-with-caption :image="c.image" :caption="c.caption" />
    </div>
  </div>
  <pre>{{ contentThree }}</pre>
</template>

<script setup lang="ts">
import CSharpLogo from '@/assets/CSharp.svg';
import HTMLLogo from '@/assets/HTML.svg';
import CSSLogo from '@/assets/CSS.svg';
import JavaLogo from '@/assets/Java.svg';
import JSLogo from '@/assets/JavaScript.svg';
import PythonLogo from '@/assets/Python.svg';
import SwiftLogo from '@/assets/Swift.svg';
import TypeScriptLogo from '@/assets/TypeScript.svg';
import SQLLogo from '@/assets/SQL.svg';
import CLogo from '@/assets/C.svg';
import display from '@/util/display';
import { onMounted, ref, watch } from 'vue';
import { useStore } from '@/store';
import IconWithCaption from '@/components/IconWithCaption.vue';

interface ImageAndCaption {
  image: string;
  caption: string;
}

const contentOne = ref('');
const contentTwo = ref([] as Array<ImageAndCaption>);
const contentThree = ref('');

const c1 = `
+-+-+-+-+-+
|A|b|o|u|t|
+-+-+-+-+-+

-- Who am I? --
I am a full-stack developer with 2 years of professional experience.

-- Education --
I am a senior at the University of Missouri, pursuing a major in Computer Science with a minor in Mathematics.

-- Current Position --
I work part time as a Junior Software Developer at O'Reilly Auto Parts.

-- Development Experience --
Front-end web development, back-end development, mobile development, database/server management, cloud engineering, application architecture, and game development.

-- What do I know? --

> Languages

`;

const c2: Array<ImageAndCaption> = [
  { image: JSLogo, caption: 'JavaScript' },
  { image: TypeScriptLogo, caption: 'TypeScript' },
  { image: HTMLLogo, caption: 'HTML' },
  { image: CSSLogo, caption: 'CSS' },
  { image: SQLLogo, caption: 'SQL' },
  { image: JavaLogo, caption: 'Java' },
  { image: PythonLogo, caption: 'Python' },
  { image: SwiftLogo, caption: 'Swift' },
  { image: CSharpLogo, caption: 'C#' },
  { image: CLogo, caption: 'C' }
];

const c3 = `> Technologies`;

const showContent = async () => {
  await display(c1, contentOne, 0);
  for (let i = 0; i < c2.length; i++) {
    setTimeout(() => {
      contentTwo.value.push(c2[i]);
    }, i * 500);
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
