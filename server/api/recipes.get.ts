import { delay, getRecipes } from "~~/server/utils/recipes";
import { z } from "zod/v4";

const queryScheme = z.object({
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(9).default(6),
});

export default defineEventHandler(async (event) => {
  const validatedQuery = await getValidatedQuery(event, queryScheme.safeParse);
  if (!validatedQuery.success) {
    return sendError(event, createError({
      statusCode: 400,
      statusMessage: "invalid query parameters",
    }));
  }

  try {
    const { page, limit } = validatedQuery.data;
    const { recipes, total } = await getRecipes({ event, page, limit });
    return { recipes, total };
  }
  catch (e) {
    // eslint-disable-next-line no-console
    console.log(e);
    return sendError(event, createError({
      statusCode: 404,
      statusMessage: "failed to fetch recipes! please try again",
    }));
  }
});
