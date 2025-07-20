import type { Recipe } from "@@/shared/recipe-schema";

import { useQuery, useQueryClient } from "@tanstack/vue-query";

import { recipeKeys, recipeQueryOptions } from "~/lib/api/recipe-query-options";

export function useRecipeQueries() {
  const queryClient = useQueryClient();

  // Paginated recipes query
  const usePaginatedRecipes = ({ page }: { page: ComputedRef<number> }) => {
    return useQuery(recipeQueryOptions.paginated({ page }));
  };

  // Single recipe query
  const useRecipe = (id: Ref<string | number | undefined>) => {
    const idRef = isRef(id) ? id : ref(id);
    return useQuery(recipeQueryOptions.byId({ id: idRef }));
  };

  // Utility functions
  const prefetchRecipe = (id: Ref<string | number | undefined>) => {
    return queryClient.prefetchQuery(recipeQueryOptions.byId({ id }));
  };

  const prefetchPage = (page: ComputedRef<number>) => {
    return queryClient.prefetchQuery(recipeQueryOptions.paginated({ page }));
  };

  const prefetchNextPage = (currentPage: ComputedRef<number>) => {
    return queryClient.prefetchQuery(recipeQueryOptions.paginated({
      page: computed(() => unref(currentPage) + 1),
    }));
  };

  // Cache management
  const getCachedRecipe = (id: string | number) => {
    return queryClient.getQueryData(recipeKeys.detail(id)) as Recipe | undefined;
  };

  return {
    // Queries
    usePaginatedRecipes,
    useRecipe,

    // Utils
    prefetchRecipe,
    prefetchPage,
    prefetchNextPage,
    getCachedRecipe,
  };
}
