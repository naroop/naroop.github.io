<template>
  <div class="flex flex-col h-screen overflow-auto items-baseline justify-between p-5 xl:px-40 xl:py-20 crt bg-black font-mono text-green-500">
    <div class="leading-none w-full">
      <div class="flex justify-between flex-wrap">
        <pre>{{ terminalHeader }}</pre>
        <div class="flex gap-2 mb-4">
          <ascii-button ref="linkedInButton" label="LinkedIn" manual-display @click="openLinkedIn" />
          <ascii-button ref="gitHubButton" label="GitHub" manual-display @click="openGitHub" />
        </div>
      </div>
      <pre class="whitespace-pre-wrap">{{ contentText }}</pre>
    </div>
    <div class="w-full pb-5">
      <pre class="text-red-500 leading-none">{{ errorText }}</pre>
      <div class="relative w-full">
        <span class="absolute top-1"> > </span>
        <input
          ref="input"
          class="bg-transparent focus:outline-none focus:ring-0 pl-4 pr-2 py-1 w-full"
          v-model="inputText"
          @keyup.enter="parse"
          @keyup.up.prevent="upPressed"
          @keyup.down.prevent="downPressed"
          spellcheck="false"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import AsciiButton from '@/components/AsciiButton.vue';
import text from '@/util/text';
import display from '@/util/display';

const input = ref({} as HTMLInputElement);
const linkedInButton = ref({} as InstanceType<typeof AsciiButton>);
const gitHubButton = ref({} as InstanceType<typeof AsciiButton>);

const terminalHeader = ref('');
const contentText = ref('');
const errorText = ref('');
const inputText = ref('');

const pastCommands: Array<string> = [];
let pastCommandsIndex: number | undefined;

const parse = async () => {
  pastCommands.push(inputText.value);
  pastCommandsIndex = undefined;

  const keys = Object.keys(text);
  const trimmed = inputText.value.trim();

  if (keys.includes(trimmed)) {
    errorText.value = '';
    await display(text[trimmed], contentText, 25);
  } else {
    await display('Command not found. Type "menu" for options.', errorText, 25);
  }
  inputText.value = '';
};

const upPressed = () => {
  if (pastCommandsIndex === undefined) {
    pastCommandsIndex = pastCommands.length - 1;
    inputText.value = pastCommands[pastCommandsIndex];
  } else if (pastCommandsIndex > 0) {
    pastCommandsIndex--;
    inputText.value = pastCommands[pastCommandsIndex];
  }
};

const downPressed = () => {
  if (pastCommandsIndex === undefined) {
    return;
  }

  if (pastCommandsIndex + 1 < pastCommands.length) {
    pastCommandsIndex++;
    inputText.value = pastCommands[pastCommandsIndex];
  } else if (pastCommandsIndex === pastCommands.length - 1) {
    pastCommandsIndex = undefined;
    inputText.value = '';
  }
};

const openLinkedIn = () => {
  window.open('https://www.linkedin.com/in/narooop/', '_blank');
};

const openGitHub = () => {
  window.open('https://github.com/naroop', '_blank');
};

onMounted(async () => {
  // display(text['about'], contentText, 0);
  input.value.disabled = true;
  document.addEventListener(
    'click',
    () => {
      input.value?.focus();
    },
    true
  ); // make terminal input always focused

  await display(text.header, terminalHeader, 10);
  await display('Type "menu" below, then press enter.', contentText, 25);
  input.value.disabled = false;
  input.value.focus();
  await gitHubButton.value.display();
  await linkedInButton.value.display();
});
</script>

<style>
.crt::after {
  content: ' ';
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(18, 16, 16, 0.1);
  opacity: 0;
  z-index: 2;
  pointer-events: none;
}
.crt::before {
  content: ' ';
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%),
    linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06));
  z-index: 2;
  background-size:
    100% 2px,
    3px 100%;
  pointer-events: none;
}
</style>
