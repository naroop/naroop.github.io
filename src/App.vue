<template>
  <div class="flex flex-col h-screen overflow-auto items-baseline justify-between p-5 xl:px-52 xl:py-20 crt bg-black font-mono text-green-500">
    <div class="leading-none w-full">
      <div class="flex justify-between flex-wrap">
        <div>
          <pre class="hidden md:block">{{ terminalHeader }}</pre>
          <pre class="md:hidden text-xs leading-none">{{ terminalHeaderNathaniel }}</pre>
          <pre class="md:hidden text-xs leading-none">{{ terminalHeaderRupp }}</pre>

          <pre class="hidden md:block">{{ subtitleText }}</pre>
          <pre>{{ coolLinesOne }}</pre>
          <pre>{{ coolLinesTwo }}</pre>
        </div>
        <div class="flex gap-2 mb-4">
          <ascii-button ref="linkedInButton" label="LinkedIn" manual-display @click="openLinkedIn" />
          <ascii-button ref="gitHubButton" label="GitHub" manual-display @click="openGitHub" />
        </div>
      </div>
      <div class="whitespace-pre-wrap">
        <router-view />
      </div>
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
import { RouterView } from 'vue-router';
import AsciiButton from '@/components/AsciiButton.vue';
import display from './util/display';
import { isStringCommand } from './util/command';
import router from './router';
import { useStore } from './store';

const input = ref({} as HTMLInputElement);
const linkedInButton = ref({} as InstanceType<typeof AsciiButton>);
const gitHubButton = ref({} as InstanceType<typeof AsciiButton>);

const headerText = ref('');
const subtitleText = ref('');
const coolLinesOne = ref('');
const coolLinesTwo = ref('');
const errorText = ref('');
const inputText = ref('');

const terminalHeader = `
             _   _                 _      _
 _ __   __ _| |_| |__   __ _ _ __ (_) ___| |  _ __ _   _ _ __  _ __
| '_ \\ / _\` | __| '_ \\ / _\` | '_ \\| |/ _ \\ | | '__| | | | '_ \\| '_ \\
| | | | (_| | |_| | | | (_| | | | | |  __/ | | |  | |_| | |_) | |_) |
|_| |_|\\__,_|\\__|_| |_|\\__,_|_| |_|_|\\___|_| |_|   \\__,_| .__/| .__/
                                                        |_|   |_|
`;

const terminalHeaderNathaniel = `
             _   _                 _      _ 
 _ __   __ _| |_| |__   __ _ _ __ (_) ___| |
| '_ \\ / _\` | __| '_ \\ / _\` | '_ \\| |/ _ \\ |
| | | | (_| | |_| | | | (_| | | | | |  __/ |
|_| |_|\\__,_|\\__|_| |_|\\__,_|_| |_|_|\\___|_|
`;

const terminalHeaderRupp = ` _ __ _   _ _ __  _ __  
| '__| | | | '_ \\| '_ \\  
| |  | |_| | |_) | |_) | Full Stack Developer
|_|   \\__,_| .__/| .__/            
           |_|   |_|   
`;
const terminalSubtitle = `Full Stack Developer`;

const topLines = `////////////////////////////////////////////////////////////////////////`;
const bottomLines = `  ////////////////////////////////////////////////////////////////////////`;

const pastCommands: Array<string> = [];
let pastCommandsIndex: number | undefined;

const parse = async () => {
  pastCommands.push(inputText.value);
  pastCommandsIndex = undefined;

  const trimmed = inputText.value.trim();
  inputText.value = '';

  if (isStringCommand(trimmed)) {
    errorText.value = '';
    router.push({ name: trimmed });
  } else {
    await display('Command not found. Type "menu" for options.', errorText);
  }
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
  input.value.disabled = true;
  document.addEventListener(
    'click',
    () => {
      input.value?.focus();
    },
    true
  ); // make terminal input always focused

  display(topLines, coolLinesOne, 25, false);
  await display(bottomLines, coolLinesTwo, 25, false);
  await display(terminalHeader, headerText, 10, false);
  await display(terminalSubtitle, subtitleText, 25, false);
  input.value.disabled = false;
  input.value.focus();
  await gitHubButton.value.display();
  await linkedInButton.value.display();
  useStore().doneDisplayingHeader = true;
});
</script>

<style>
html,
body {
  height: 100;
}

/* Styles for the scrollbar track (background) */
::-webkit-scrollbar {
  width: 5px; /* or any desired width */
}

/* Styles for the scrollbar handle */
::-webkit-scrollbar-thumb {
  background-color: #22c55e; /* or any color */
}

/* Optional: Styles for the scrollbar track */
::-webkit-scrollbar-track {
  background: black; /* or any color */
}

/* Optional: Styles for the scrollbar corner */
::-webkit-scrollbar-corner {
  background-color: black; /* or any color */
}

html {
  background-color: black;
}

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
