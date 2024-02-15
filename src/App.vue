<template>
  <router-view />
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router';
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
</style>
