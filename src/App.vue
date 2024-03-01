<template>
  <div class="flex flex-col md:h-screen md:overflow-auto items-baseline justify-between crt px-3 xl:px-72 bg-black font-mono text-green-500 relative">
    <div class="leading-none w-full mb-20 md:mb-0">
      <div class="sticky top-0 left-0 bg-black md:flex justify-between flex-wrap">
        <div>
          <!-- Desktop -->
          <pre class="hidden md:block">{{ headerText }}</pre>
          <pre class="hidden md:block">{{ subtitleText }}</pre>
          <pre class="hidden md:block">{{ linesOneText }}</pre>
          <pre class="hidden md:block">{{ linesTwoText }}</pre>

          <!-- Mobile -->
          <pre class="md:hidden leading-none">{{ mobileHeaderText }}</pre>
          <pre class="md:hidden leading-none pb-2">{{ mobileLinesText }}</pre>
        </div>
        <div class="hidden md:flex gap-2 md:mb-4">
          <ascii-button ref="linkedInButton" label="LinkedIn" manual-display @click="openLinkedIn" />
          <ascii-button ref="gitHubButton" label="GitHub" manual-display @click="openGitHub" />
        </div>
      </div>
      <div class="flex flex-col whitespace-pre-wrap md:h-[calc(100vh-10rem-4.063rem)]">
        <router-view />
      </div>
    </div>
    <div class="pb-5 fixed bg-black w-full left-0 bottom-0 p-3 xl:px-72">
      <pre class="text-red-500 leading-none text-xs md:text-base">{{ errorText }}</pre>
      <div class="relative w-full">
        <span class="absolute top-1"> > </span>
        <input
          ref="input"
          class="bg-transparent focus:outline-none focus:ring-0 pl-4 pr-2 py-1 w-full border-b rounded-none border-b-green-500 border-dashed"
          placeholder='"menu" for options'
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
import Command, { getCommand } from './util/command';
import router from './router';
import { useStore } from './store';

const input = ref({} as HTMLInputElement);
const linkedInButton = ref({} as InstanceType<typeof AsciiButton>);
const gitHubButton = ref({} as InstanceType<typeof AsciiButton>);

const headerText = ref('');
const subtitleText = ref('');
const linesOneText = ref('');
const linesTwoText = ref('');

const mobileHeaderText = ref('');
const mobileLinesText = ref('');

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
const terminalSubtitle = `Full Stack Developer`;
const topLines = `////////////////////////////////////////////////////////////////////////`;
const bottomLines = `  ////////////////////////////////////////////////////////////////////////`;
const mobileLines = `
////////////////////////////////////`;

const mobileTerminalHeader = ` _ __   _ __
| '_ \\ | '__|  Nathaniel Rupp
| | | || |
|_| |_||_|  Full Stack Developer
`;

const pastCommands: Array<string> = [];
let pastCommandsIndex: number | undefined;

const parse = async () => {
  pastCommands.push(inputText.value);
  pastCommandsIndex = undefined;

  const trimmed = inputText.value.trim();
  inputText.value = '';

  let commandKey = getCommand(trimmed);

  if (commandKey) {
    errorText.value = '';
    router.push({ name: Command[commandKey].name });
  } else if (trimmed === '69') {
    await display('nice.', errorText);
  } else {
    await display('Command not found. Type "menu" for options.', errorText);
  }

  input.value.blur();
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

const displayDesktop = async () => {
  await display(terminalHeader, headerText, 10, false);
  await display(terminalSubtitle, subtitleText, 25, false);
  display(topLines, linesOneText, 25, false);
  display(bottomLines, linesTwoText, 25, false);
  await gitHubButton.value.display();
  await linkedInButton.value.display();
};

const displayMobile = async () => {
  await display(mobileTerminalHeader, mobileHeaderText, 25, false);
  display(mobileLines, mobileLinesText, 25, false);
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

  const breakpoint = '(min-width: 768px)';
  const mediaQuery = window.matchMedia(breakpoint);

  if (mediaQuery.matches) {
    // desktop view
    await displayDesktop();
    displayMobile();
  } else {
    // mobile view
    await displayMobile();
    displayDesktop();
  }

  input.value.disabled = false;
  input.value.focus();
  useStore().doneDisplayingHeader = true;
});
</script>

<style>
html,
body {
  height: 100%;
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
