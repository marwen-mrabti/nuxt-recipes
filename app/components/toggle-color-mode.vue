<script setup>
import { MoonIcon, SunIcon } from "lucide-vue-next";

import { Button } from "~/components/ui/button";

const colorMode = useColorMode();

const isDark = computed({
  get() {
    return colorMode.value === "dark";
  },
  set(_isDark) {
    colorMode.preference = _isDark ? "dark" : "light";
  },
});
</script>

<template>
  <ClientOnly v-if="!colorMode?.forced">
    <Button
      color="neutral"
      variant="ghost"
      size="icon"
      class="flex items-center justify-center"
      @click="isDark = !isDark"
    >
      <div class="relative size-8">
        <Transition
          enter-active-class="transition-all duration-300 ease-out"
          leave-active-class="transition-all duration-300 ease-in"
          enter-from-class="opacity-0 rotate-[180deg] scale-50"
          leave-to-class="opacity-0 rotate-[-180deg] scale-50"
        >
          <SunIcon
            v-if="!isDark"
            class="absolute top-[50%] left-[50%] -translate-1/2 inset-0"
          />
        </Transition>

        <Transition
          enter-active-class="transition-all duration-300 ease-out"
          leave-active-class="transition-all duration-300 ease-in"
          enter-from-class="opacity-0 rotate-[-180deg] scale-50"
          leave-to-class="opacity-0 rotate-[180deg] scale-50"
        >
          <MoonIcon
            v-if="isDark"
            class="absolute top-[50%] left-[50%] -translate-1/2 inset-0"
          />
        </Transition>
      </div>
    </Button>

    <template #fallback>
      <div class="size-8" />
    </template>
  </ClientOnly>
</template>
