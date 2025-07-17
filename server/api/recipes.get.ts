import type { Recipe } from '@/shared/recipe.schema'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  try {
    const { recipes } = await $fetch<{ recipes: Recipe[] }>(
      `${config.dummyApi.baseUrl}`, {
        query: {
          limit: 7,
          select: ['id', 'name', 'image', 'rating']
          // skip: 10,
        }
      }
    )

    return recipes
  } catch (e) {
    console.log(e)
    return sendError(event, createError({
      statusCode: 404,
      statusMessage: 'failed to fetch recipes! please try agian'
    }))
  }
})
