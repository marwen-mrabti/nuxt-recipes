import type { Recipe } from "@@/shared/recipe-schema";

export const getRecipes = defineCachedFunction(
  async ({ page, limit }: { page: number; limit: number }) => {
    const dummyApiUrl = useRuntimeConfig().DummyApi.baseUrl;
    const { recipes, total } = await $fetch<{ recipes: Recipe[]; total: number }>(
      `${dummyApiUrl}`,
      {
        query: {
          page,
          limit,
          select: ["id", "name", "image", "rating"],
          skip: (page - 1) * limit, // (page - 1)*limit
          sort: "rating",
        },
      },
    );
    return { recipes, total };
  },
  {
    swr: true,
    maxAge: 10,
    staleMaxAge: 30,
    getKey: ({ page }) => {
      return `recipes-page_${page}`;
    },
  },
);
