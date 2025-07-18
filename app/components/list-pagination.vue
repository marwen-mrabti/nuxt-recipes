<script setup lang="ts">
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "~/components/ui/pagination";

const props = defineProps<{
  total: number;
}>();

const router = useRouter();
const route = useRoute();

const currentPage = computed(() => Number(route.query.page || 1));

function handlePageChange(newPage: number) {
  router.push({ query: { ...route.query, page: newPage } });
}
</script>

<template>
  <Pagination
    v-slot="{ page }"
    :items-per-page="6"
    :total="props.total"
    :current-page="currentPage"
    :default-page="1"
    @update:page="handlePageChange"
  >
    <PaginationContent v-slot="{ items }">
      <PaginationPrevious />

      <template v-for="(item, index) in items" :key="index">
        <PaginationItem
          v-if="item.type === 'page'"
          :value="item.value"
          :is-active="item.value === page"
        >
          {{ item.value }}
        </PaginationItem>
      </template>

      <PaginationEllipsis :index="4" />

      <PaginationNext />
    </PaginationContent>
  </Pagination>
</template>
