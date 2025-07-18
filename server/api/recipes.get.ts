import { z } from "zod/v4";

import type { Recipe } from "@/shared/recipe.schema";

const queryScheme = z.object({
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(9).default(6),
});

export default defineCachedEventHandler(async (event) => {
  const dummyApiUrl = useRuntimeConfig(event).DummyApi.baseUrl;

  const validatedQuery = await getValidatedQuery(event, queryScheme.safeParse);
  if (!validatedQuery.success) {
    return sendError(event, createError({
      statusCode: 400,
      statusMessage: "invalid query parameters",
    }));
  }

  try {
    const { page, limit } = validatedQuery.data;
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
  }
  catch (e) {
    console.log(e);
    return sendError(event, createError({
      statusCode: 404,
      statusMessage: "failed to fetch recipes! please try again",
    }));
  }
}, {
  swr: true,
  maxAge: 10,
  staleMaxAge: 30,
  getKey: (event) => {
    const query = getQuery(event);
    return `recipes-${query.page}-${query.limit}`;
  },
});
