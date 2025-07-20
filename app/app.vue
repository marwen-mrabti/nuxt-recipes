<script setup lang="ts">
const colorMode = useColorMode();

const color = computed(() => (colorMode.value === "dark" ? "#1b1718" : "white"));

useHead({
  meta: [
    { charset: "utf-8" },
    { name: "viewport", content: "width=device-width, initial-scale=1" },
    { key: "theme-color", name: "theme-color", content: color },
  ],
  link: [{ rel: "icon", href: "/favicon.ico" }],
  htmlAttrs: {
    lang: "en",
  },
});

const title = "Nuxt Recipes";
const description = "find your favorite recipes and cook them with ease.";

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
});
</script>

<template>
  <NuxtRouteAnnouncer />
  <NuxtLoadingIndicator color="var(--ui-primary)" />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
