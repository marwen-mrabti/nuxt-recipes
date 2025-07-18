<script lang="ts" setup>
import ListPagination from "~/components/list-pagination.vue";
import { Button } from "~/components/ui/button";

const route = useRoute();

const page = computed(() => Number(route.query.page || 1));
const imageLoaded = useState("imageLoaded", () => false);

const {
  data,
  status,
  error,
  refresh,
} = await useFetch("/api/recipes", {
  query: { page },
  key: "recipes",
  watch: [page],
  lazy: true,
});
const recipes = computed(() => data.value?.recipes || []);
const total = computed(() => data.value?.total || 0);
</script>

<template>
  <main class="container mx-auto space-y-6 py-4 px-4">
    <div class="flex items-center gap-6">
      <h2 class="text-2xl">
        Recipes
      </h2>
      <Button
        v-show="status !== 'error'"
        class="w-fit px-2 bg-accent text-accent-foreground"
        variant="outline"
        :disabled="status === 'pending'"
        @click="() => refresh()"
      >
        refetch
      </Button>
      <div class="flex-1 flex justify-center">
        <ListPagination :total="total" />
      </div>
    </div>
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
        class="group/recipe aspect-square grid grid-rows-subgrid row-span-3 gap-4 border-2 border-neutral-200 rounded-sm p-2"
      >
        <div class="h-64 overflow-hidden rounded bg-gray-100 mb-4 relative">
          <div v-if="!imageLoaded" class="absolute inset-0 bg-gray-200 animate-pulse rounded" />
          <NuxtImg
            :src="recipe.image"
            :alt="recipe.name"
            class="size-full object-cover object-center group-hover/recipe:grayscale-75 transition-all ease-in-out duration-300"
            loading="lazy"
            placeholder
            @load="imageLoaded = true"
            @error="imageLoaded = false"
          />
        </div>
        <p class="text-balance group-hover/recipe:text-accent-foreground group-hover/recipe:animate-pulse transition-all ease-linear duration-200">
          <NuxtLink
            :to="{ name: 'recipe-id', params: { id: recipe.id } }"
            prefetch-on="interaction"
            class="flex items-center gap-2"
          >
            <Icon name="i-tabler-chevron-right" class="size-5" />
            {{ recipe.name }}
          </NuxtLink>
        </p>
        <div class="text-pretty flex justify-between items-center w-full gap-2">
          <p class="flex items-center gap-1 text-xs whitespace-nowrap">
            <Icon name="i-tabler-map-pin" class="size-5" />
            <span>{{ recipe.cuisine || "Unknown Cuisine" }}</span>
          </p>
          <p class="flex items-center gap-1">
            <span>rating: </span>
            <span
              v-for="(_, index) in Math.floor(recipe.rating)"
              :key="index"
              class="flex flex-row gap-1 items-center"
            >
              <Icon name="i-tabler-star-filled" class="size-5 text-amber-400" />
            </span>
          </p>
        </div>
      </li>
    </ul>
  </main>
</template>
