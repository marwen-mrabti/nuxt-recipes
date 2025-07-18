import type { Recipe } from "@@/shared/recipe-schema";
import type { H3Event } from "h3";

export const getRecipes = defineCachedFunction(
  async ({ event, page, limit }: { event: H3Event; page: number; limit: number }) => {
    const dummyApiUrl = useRuntimeConfig(event).DummyApi.baseUrl;
    const { recipes, total } = await $fetch<{ recipes: Recipe[]; total: number }>(
      `${dummyApiUrl}`,
      {
        query: {
          page,
          limit,
          select: ["id", "name", "image", "rating"],
          skip: (page - 1) * limit, // how many items to skip (db indexes from 0 so we subtract 1)
          sort: "rating",
        },
      },
    );
    return { recipes, total };
  },
  {
    swr: true,
    maxAge: 60 * 5, // Cache stays fresh for 5 minutes
    staleMaxAge: 60 * 10, // Can serve stale data for up to 10 minutes while revalidating
    getKey: ({ page }) => {
      return `recipes-page_${page}`;
    },
  },
);

export const getRecipeById = defineCachedFunction(
  async ({ event, id }: { event: H3Event; id: string }) => {
    const dummyApiUrl = useRuntimeConfig(event).DummyApi.baseUrl;
    const recipe = await $fetch<Recipe>(`${dummyApiUrl}/${id}`, {
      query: {
        // select: ["id", "name", "image", "rating", "description", "ingredients"],
      },
    });
    return recipe;
  },
  {
    swr: true,
    maxAge: 60 * 5, // Cache stays fresh for 5 minutes
    staleMaxAge: 60 * 10, // Can serve stale data for up to 10 minutes while revalidating
    getKey: ({ id }) => {
      return `recipe-id_${id}`;
    },
  },
);
