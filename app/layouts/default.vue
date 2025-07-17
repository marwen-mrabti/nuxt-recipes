<script setup lang="ts">
import ToggleColorMode from '~/components/toggle-color-mode.vue'
</script>

<template>
  <div>
    <header>
      <ToggleColorMode />
    </header>
    <slot />
  </div>
</template>
