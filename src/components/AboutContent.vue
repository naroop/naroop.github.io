<template>
  <div class="text-green-500 leading-none font-mono">
    <pre class="">{{ contentOne }}</pre>
    <div class="grid grid-cols-3 md:grid-cols-5 gap-y-4">
      <div v-for="img in contentTwo" :key="img" class="flex flex-col items-center gap-1">
        <img :src="img" class="w-10 h-auto" />
        <span> {{ img.slice(12).split('.')[0] }}</span>
      </div>
    </div>
  </div>
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
import { onMounted, ref } from 'vue';

const contentOne = ref('');
const contentTwo = ref([] as Array<string>);

const c1 = `
+-+-+-+-+-+
|A|b|o|u|t|
+-+-+-+-+-+

-- Who am I? --
I am a full-stack developer with 2 years of professional experience.

-- Education --
I currently attend the University of Missouri with a major in Computer Science and a minor in Mathematics.

-- Current Position --
I work part time as a Junior Software Developer at O'Reilly Auto Parts.

-- Development Experience --
Front-end web development, back-end development, mobile development, database/server management, cloud engineering, application architecture, and game development.

-- What do I know? --

`;

const c2 = [JSLogo, TypeScriptLogo, HTMLLogo, CSSLogo, SQLLogo, JavaLogo, PythonLogo, SwiftLogo, CSharpLogo, CLogo];

onMounted(async () => {
  await display(c1, contentOne, 25);
  for (let i = 0; i < c2.length; i++) {
    setTimeout(() => {
      contentTwo.value.push(c2[i]);
    }, i * 200);
  }
});
</script>
