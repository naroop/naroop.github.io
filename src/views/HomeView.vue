<template>
  <div class="flex flex-col h-screen overflow-auto items-baseline justify-between p-5 md:p-20 crt bg-black font-mono text-green-500">
    <div class="leading-none">
      <pre>{{ terminalHeader }}</pre>
      <pre>{{ contentText }}</pre>
    </div>
    <div>
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
import { onMounted, ref, type Ref } from 'vue';
import text from '@/util/text';

const input = ref({} as HTMLInputElement);

const terminalHeader = ref('');
const contentText = ref('');
const errorText = ref('');
const inputText = ref('');

const pastCommands: Array<string> = [];
let pastCommandsIndex: number | undefined;

let cancelPreviousDisplay = () => {}; // Function to cancel the previous display

const display = async (displayThis: string[] | string, where: Ref<string>, speed: number): Promise<void> => {
  // Cancel any previous display that might still be running
  cancelPreviousDisplay();

  // A new promise that resolves when the current display execution is cancelled
  let cancelled = false;
  cancelPreviousDisplay = () => {
    cancelled = true;
  };

  where.value = '';
  const formattedDisplayThis = typeof displayThis === 'string' ? displayThis : displayThis.join('\n');

  const promises: Promise<void>[] = [];

  for (let i = 0; i < formattedDisplayThis.length; i++) {
    const promise = new Promise<void>((resolve) => {
      setTimeout(() => {
        if (cancelled) return; // If cancelled, do not proceed
        where.value += formattedDisplayThis.charAt(i);
        resolve();
      }, i * speed);
    });

    promises.push(promise);
  }

  await Promise.all(promises).finally(() => {
    // When all promises complete or the function is cancelled, consider the display not running
    if (!cancelled) {
      cancelPreviousDisplay = () => {}; // Reset the cancel function
    }
  });
};

const parse = () => {
  pastCommands.push(inputText.value);
  pastCommandsIndex = undefined;

  const keys = Object.keys(text);
  const trimmed = inputText.value.trim();

  if (keys.includes(trimmed)) {
    errorText.value = '';
    display(text[trimmed], contentText, 25);
  } else {
    display('Command not found. Type "menu" for options.', errorText, 25);
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

onMounted(() => {
  input.value.disabled = true;
  display(text.header, terminalHeader, 10).then(() => {
    display('Type "menu" below, then press enter.', contentText, 25);
    input.value.disabled = false;
    input.value.focus();
  });
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
