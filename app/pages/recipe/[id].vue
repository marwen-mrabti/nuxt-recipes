<script setup lang='ts'>
import {
  BookOpen,
  ChefHat,
  Clock,
  Heart,
  MapPin,
  Share2,
  ShoppingCart,
  Star,
  Tag,
  Timer,
  Users,
  Utensils,
  Zap,
} from "lucide-vue-next";

import { Skeleton } from "~/components/ui/skeleton";

const route = useRoute();
const id = computed(() => route.params.id);
const imageState = useState<"loading" | "loaded" | "error">("imageState", () => "loading");

const { data: recipe, error, status } = await useFetch(`/api/recipes/${id.value}`, {
  key: `recipe-${id.value}`,
  watch: [id],
  lazy: true,
});

function getDifficultyColor(difficulty: string) {
  switch (difficulty?.toLowerCase()) {
    case "easy":
      return "bg-green-100 text-green-800";
    case "medium":
      return "bg-yellow-100 text-yellow-800";
    case "hard":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
}
useHead({
  title: `${recipe.value ? recipe.value.name : "Loading..."}`,
});
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <div v-if="status === 'pending'">
      <RecipeLoadingSkeleton />
    </div>
    <div v-else-if="status === 'error' || !recipe">
      <p class="text-error-400">
        {{ error?.statusMessage }}
      </p>
    </div>
    <div v-else>
      <div class="min-h-screen bg-gray-50">
        <!-- Hero Section -->
        <div class="relative h-96 overflow-hidden isolate">
          <div class="h-64 overflow-hidden rounded mb-4 bg-gray-100 relative">
            <Skeleton v-if="imageState === 'loading'" class="absolute inset-0" />
            <div v-else-if="imageState === 'error'" class="absolute inset-0 bg-gray-300 flex flex-col items-center justify-center text-pretty">
              <span class="text-destructive font-medium">Image failed to load!</span>
              <span class="text-secondary font-semibold">Try reloading the page</span>
            </div>
            <NuxtImg
              v-if="recipe?.image"
              :src="recipe?.image"
              :alt="recipe?.name"
              class="w-full h-full object-cover object-center"
              loading="lazy"
              provider="dummyjson"
              placeholder
              @load="imageState = 'loaded'"
              @error="imageState = 'error'"
            />
          </div>
          <div class="absolute inset-0 bg-black opacity-85 flex items-end">
            <div class="container mx-auto px-4 pb-8">
              <div class="text-white">
                <h1 class="text-4xl md:text-5xl font-bold mb-2">
                  {{ recipe.name }}
                </h1>
                <div class="flex items-center gap-4 text-lg">
                  <div class="flex items-center gap-1">
                    <Star class="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    <span>{{ recipe.rating }}</span>
                    <span class="text-gray-300">({{ recipe.reviewCount }} reviews)</span>
                  </div>
                  <div class="flex items-center gap-1">
                    <MapPin class="w-5 h-5" />
                    <span>{{ recipe.cuisine }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="container mx-auto px-4 py-8">
          <div class="grid lg:grid-cols-3 gap-8">
            <!-- Main Content -->
            <div class="lg:col-span-2 space-y-8">
              <!-- Recipe Info Cards -->
              <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div class="bg-white rounded-lg p-4 shadow-sm border">
                  <div class="flex items-center gap-2 text-gray-600 mb-1">
                    <Clock class="w-4 h-4" />
                    <span class="text-sm">Prep Time</span>
                  </div>
                  <div class="text-2xl font-bold text-gray-900">
                    {{ recipe.prepTimeMinutes }}m
                  </div>
                </div>
                <div class="bg-white rounded-lg p-4 shadow-sm border">
                  <div class="flex items-center gap-2 text-gray-600 mb-1">
                    <ChefHat class="w-4 h-4" />
                    <span class="text-sm">Cook Time</span>
                  </div>
                  <div class="text-2xl font-bold text-gray-900">
                    {{ recipe.cookTimeMinutes }}m
                  </div>
                </div>
                <div class="bg-white rounded-lg p-4 shadow-sm border">
                  <div class="flex items-center gap-2 text-gray-600 mb-1">
                    <Users class="w-4 h-4" />
                    <span class="text-sm">Servings</span>
                  </div>
                  <div class="text-2xl font-bold text-gray-900">
                    {{ recipe.servings }}
                  </div>
                </div>
                <div class="bg-white rounded-lg p-4 shadow-sm border">
                  <div class="flex items-center gap-2 text-gray-600 mb-1">
                    <Zap class="w-4 h-4" />
                    <span class="text-sm">Calories</span>
                  </div>
                  <div class="text-2xl font-bold text-gray-900">
                    {{ recipe.caloriesPerServing }}
                  </div>
                </div>
              </div>

              <!-- Difficulty Badge -->
              <div class="flex items-center gap-2">
                <span class="text-gray-600">Difficulty:</span>
                <span
                  class="px-3 py-1 rounded-full text-sm font-medium"
                  :class="getDifficultyColor(recipe.difficulty)"
                >
                  {{ recipe.difficulty }}
                </span>
              </div>

              <!-- Ingredients -->
              <div class="bg-white rounded-lg p-6 shadow-sm border">
                <h2 class="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <ShoppingCart class="w-6 h-6" />
                  Ingredients
                </h2>
                <ul class="space-y-3">
                  <li
                    v-for="(ingredient, index) in recipe.ingredients"
                    :key="index"
                    class="flex items-start gap-3 p-2 rounded hover:bg-gray-50 transition-colors"
                  >
                    <div class="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                    <span class="text-gray-700">{{ ingredient }}</span>
                  </li>
                </ul>
              </div>

              <!-- Instructions -->
              <div class="bg-white rounded-lg p-6 shadow-sm border">
                <h2 class="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <BookOpen class="w-6 h-6" />
                  Instructions
                </h2>
                <ol class="space-y-4">
                  <li
                    v-for="(instruction, index) in recipe.instructions"
                    :key="index"
                    class="flex gap-4 p-4 rounded-lg bg-gray-50"
                  >
                    <div class="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                      {{ index + 1 }}
                    </div>
                    <p class="text-gray-700 leading-relaxed">
                      {{ instruction }}
                    </p>
                  </li>
                </ol>
              </div>
            </div>

            <!-- Sidebar -->
            <div class="space-y-6">
              <!-- Meal Types -->
              <div class="bg-white rounded-lg p-6 shadow-sm border">
                <h3 class="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Utensils class="w-5 h-5" />
                  Meal Types
                </h3>
                <div class="flex flex-wrap gap-2">
                  <span
                    v-for="mealType in recipe.mealType"
                    :key="mealType"
                    class="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                  >
                    {{ mealType }}
                  </span>
                </div>
              </div>

              <!-- Tags -->
              <div class="bg-white rounded-lg p-6 shadow-sm border">
                <h3 class="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Tag class="w-5 h-5" />
                  Tags
                </h3>
                <div class="flex flex-wrap gap-2">
                  <span
                    v-for="tag in recipe.tags"
                    :key="tag"
                    class="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition-colors cursor-pointer"
                  >
                    #{{ tag }}
                  </span>
                </div>
              </div>

              <!-- Total Time -->
              <div class="bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-6 text-white">
                <h3 class="text-lg font-semibold mb-2 flex items-center gap-2">
                  <Timer class="w-5 h-5" />
                  Total Time
                </h3>
                <div class="text-3xl font-bold">
                  {{ recipe.prepTimeMinutes + recipe.cookTimeMinutes }} minutes
                </div>
              </div>

              <!-- Action Buttons -->
              <div class="space-y-3">
                <button class="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2">
                  <Heart class="w-5 h-5" />
                  Save Recipe
                </button>
                <button class="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2">
                  <Share2 class="w-5 h-5" />
                  Share Recipe
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
