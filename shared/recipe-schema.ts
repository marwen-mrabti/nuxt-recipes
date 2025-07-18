import { z } from "zod/v4";

const RecipeSchema = z.object({
  id: z.number(),
  name: z.string(),
  ingredients: z.array(z.string()),
  instructions: z.array(z.string()),
  prepTimeMinutes: z.number(),
  cookTimeMinutes: z.number(),
  servings: z.number(),
  difficulty: z.string(),
  cuisine: z.string(),
  caloriesPerServing: z.number(),
  tags: z.array(z.string()),
  userId: z.number(),
  image: z.string().url(),
  rating: z.number(),
  reviewCount: z.number(),
  mealType: z.array(z.string()),
});

export type Recipe = z.infer<typeof RecipeSchema>;

export default RecipeSchema;
