import type { PaginatedRecipes, Recipe } from "@@/shared/recipe-schema";
import type { QueryKey } from "@tanstack/vue-query";

import { $fetch } from "ofetch";

export const fetcher = <T>(url: string, options?: any) => $fetch<T>(url, options);

// Query key factories
export const recipeKeys = {
  paginated: (page: ComputedRef<number>) => ["recipes", "paginated", page] as QueryKey,
  detail: (id: string | number | undefined) => ["recipes", "detail", id] as QueryKey,
};

// Query options
export const recipeQueryOptions = {
  paginated: ({ page }: { page: ComputedRef<number> }) => ({
    queryKey: recipeKeys.paginated(page),
    queryFn: () => fetcher<PaginatedRecipes>("/api/recipes", {
      query: { page: unref(page) },
    }),
  }),

  byId: ({ id }: { id: Ref<string | number | undefined> | string | number | undefined }) => ({
    queryKey: recipeKeys.detail(unref(id)),
    queryFn: () => fetcher<Recipe>(`/api/recipes/${unref(id)}`),
    enabled: !!id,
  }),
};
