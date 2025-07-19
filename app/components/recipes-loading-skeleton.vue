<script setup lang="ts">
import { Skeleton } from "~/components/ui/skeleton";
</script>

<template>
  <ul class="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4">
    <li
      v-for="n in 8"
      :key="n"
      class="aspect-square grid grid-rows-subgrid row-span-3 gap-4 border-2 border-neutral-200 rounded-sm p-2"
    >
      <div class="h-64 w-full overflow-hidden bg-gray-50 rounded mb-4 relative">
        <Skeleton class="absolute inset-0" />
      </div>
      <div class="text-balance">
        <Skeleton class="h-4 w-3/4 mb-1 bg-gray-100" />
        <Skeleton class="h-4 w-1/2 bg-gray-100" />
      </div>
      <div class="text-pretty">
        <Skeleton class="h-4 w-20 bg-gray-100" />
      </div>
    </li>
  </ul>
</template>
