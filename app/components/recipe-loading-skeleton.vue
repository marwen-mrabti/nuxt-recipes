<script setup lang="ts">
import { Card } from "~/components/ui/card";
import { Skeleton } from "~/components/ui/skeleton";
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Hero Section Skeleton -->
    <div class="relative h-96 overflow-hidden isolate">
      <Skeleton class="w-full h-full" />
      <div class="absolute inset-0 bg-black opacity-85 flex items-end">
        <div class="container mx-auto px-4 pb-8">
          <div class="text-white">
            <Skeleton class="h-12 w-80 mb-2 bg-gray-600" />
            <div class="flex items-center gap-4">
              <div class="flex items-center gap-2">
                <Skeleton class="w-5 h-5 bg-gray-600" />
                <Skeleton class="h-6 w-8 bg-gray-600" />
                <Skeleton class="h-6 w-24 bg-gray-600" />
              </div>
              <div class="flex items-center gap-2">
                <Skeleton class="w-5 h-5 bg-gray-600" />
                <Skeleton class="h-6 w-16 bg-gray-600" />
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
          <!-- Recipe Info Cards Skeleton -->
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card
              v-for="i in 4"
              :key="i"
              class="p-4"
            >
              <div class="flex items-center gap-2 mb-1">
                <Skeleton class="w-4 h-4" />
                <Skeleton class="h-4 w-16" />
              </div>
              <Skeleton class="h-8 w-12" />
            </Card>
          </div>

          <!-- Difficulty Badge Skeleton -->
          <div class="flex items-center gap-2">
            <Skeleton class="h-5 w-16" />
            <Skeleton class="h-6 w-20 rounded-full" />
          </div>

          <!-- Ingredients Skeleton -->
          <Card class="p-6">
            <div class="flex items-center gap-2 mb-4">
              <Skeleton class="w-6 h-6" />
              <Skeleton class="h-8 w-32" />
            </div>
            <div class="space-y-3">
              <div
                v-for="i in 8"
                :key="i"
                class="flex items-start gap-3 p-2"
              >
                <Skeleton class="w-2 h-2 rounded-full mt-2 flex-shrink-0" />
                <Skeleton class="h-5 w-full max-w-xs" />
              </div>
            </div>
          </Card>

          <!-- Instructions Skeleton -->
          <Card class="p-6">
            <div class="flex items-center gap-2 mb-4">
              <Skeleton class="w-6 h-6" />
              <Skeleton class="h-8 w-32" />
            </div>
            <div class="space-y-4">
              <div
                v-for="i in 6"
                :key="i"
                class="flex gap-4 p-4 rounded-lg bg-gray-50"
              >
                <Skeleton class="w-8 h-8 rounded-full flex-shrink-0" />
                <div class="space-y-2 flex-1">
                  <Skeleton class="h-4 w-full" />
                  <Skeleton class="h-4 w-4/5" />
                  <Skeleton v-if="i % 3 === 0" class="h-4 w-3/4" />
                </div>
              </div>
            </div>
          </Card>
        </div>

        <!-- Sidebar -->
        <div class="space-y-6">
          <!-- Meal Types Skeleton -->
          <Card class="p-6">
            <div class="flex items-center gap-2 mb-3">
              <Skeleton class="w-5 h-5" />
              <Skeleton class="h-6 w-24" />
            </div>
            <div class="flex flex-wrap gap-2">
              <Skeleton
                v-for="i in 3"
                :key="i"
                class="h-6 w-16 rounded-full"
              />
            </div>
          </Card>

          <!-- Tags Skeleton -->
          <Card class="p-6">
            <div class="flex items-center gap-2 mb-3">
              <Skeleton class="w-5 h-5" />
              <Skeleton class="h-6 w-16" />
            </div>
            <div class="flex flex-wrap gap-2">
              <Skeleton
                v-for="i in 6"
                :key="i"
                class="h-6 w-20 rounded-full"
              />
            </div>
          </Card>

          <!-- Total Time Skeleton -->
          <Card class="p-6 bg-gradient-to-r from-green-500 to-green-600">
            <div class="flex items-center gap-2 mb-2">
              <Skeleton class="w-5 h-5 bg-green-400" />
              <Skeleton class="h-6 w-24 bg-green-400" />
            </div>
            <Skeleton class="h-9 w-32 bg-green-400" />
          </Card>

          <!-- Action Buttons Skeleton -->
          <div class="space-y-3">
            <Skeleton class="w-full h-12 rounded-lg" />
            <Skeleton class="w-full h-12 rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
