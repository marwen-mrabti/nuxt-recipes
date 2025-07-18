import { getRecipeById } from "~~/server/utils/recipes";
import { z } from "zod/v4";

const paramsSchema = z.object({
  id: z.string(),
});

export default defineEventHandler(async (event) => {
  const validatedParams = await getValidatedRouterParams(event, paramsSchema.safeParse);
  if (!validatedParams.success) {
    return sendError(event, createError({
      statusCode: 400,
      statusMessage: "invalid parameters",
    }));
  }

  const { id } = validatedParams.data;

  try {
    const recipe = await getRecipeById({ event, id });
    if (!recipe) {
      return sendError(event, createError({
        statusCode: 404,
        statusMessage: "recipe not found",
      }));
    }
    return recipe;
  }
  catch (e) {
    console.error(e);
    return sendError(event, createError({
      statusCode: 404,
      statusMessage: "recipe not found",
    }));
  }
});
