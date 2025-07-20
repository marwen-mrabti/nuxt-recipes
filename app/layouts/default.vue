<script lang="ts" setup>
</script>

<template>
  <div class="relative isolate container mx-auto max-w-7xl ">
    <header class="sticky top-0 z-50 w-full flex items-center justify-end py-2 px-4">
      <NuxtLink
        to="/"
        class="mr-auto"
        prefetch-on="interaction"
      >
        <h2>
          <span class="text-2xl font-bold text-primary">Nuxt Recipes</span>
        </h2>
      </NuxtLink>
      <ToggleColorMode />
    </header>
    <main>
      <slot />
      <!-- <VueQueryDevtools :initial-is-open="false" /> -->
    </main>
  </div>
</template>
