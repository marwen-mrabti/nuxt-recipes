<script lang="ts" setup>
import type { Recipe } from "@/shared/recipe.schema";

import { Button } from "~/components/ui/button";

const imageLoaded = ref(false);
const {
  data: recipes,
  status,
  error,
  refresh,
} = await useFetch<Recipe[]>("/api/recipes", {
  lazy: true,
  key: "recipes",
});
</script>

<template>
  <main class="container mx-auto space-y-6 py-4 px-4">
    <h2 class="text-2xl">
      Recipes
    </h2>
    <Button
      v-show="status !== 'error' && status !== 'pending'"
      color="secondary"
      class="w-fit px-2"
      variant="outline"
      :disabled="status === 'pending'"
      @click="() => refresh()"
    >
      refetch
    </Button>
    <RecipesLoadingSkeleton v-if="status === 'pending'" />
    <div v-else-if="status === 'error'">
      <p class="text-error-400">
        {{ error?.statusMessage }}
      </p>
      <Button color="info" @click="() => refresh()">
        try again
      </Button>
    </div>

    <ul v-else class="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4">
      <li
        v-for="recipe in recipes"
        :key="recipe.id"
        class="aspect-square grid grid-rows-subgrid row-span-3 gap-4 border-2 border-neutral-200 rounded-sm p-2"
      >
        <div class="h-64 overflow-hidden rounded bg-gray-100 mb-4 relative">
          <div v-if="!imageLoaded" class="absolute inset-0 bg-gray-200 animate-pulse rounded" />
          <NuxtImg
            :src="recipe.image"
            :alt="recipe.name"
            class="size-full object-cover object-center"
            loading="lazy"
            placeholder
            @load="imageLoaded = true"
            @error="imageLoaded = false"
          />
        </div>
        <p class="text-balance">
          <NuxtLink to="#">
            {{ recipe.name }}
          </NuxtLink>
        </p>
        <p class="text-pretty flex items-center w-full gap-2">
          <span>rating: </span>
          <span
            v-for="(_, index) in Math.floor(recipe.rating)"
            :key="index"
            class="flex flex-row gap-1 items-center"
          >
            <Icon name="i-tabler-star-filled" class="size-5 text-amber-400" />
          </span>
        </p>
      </li>
    </ul>
  </main>
</template>
