import type { ProviderGetImage } from "@nuxt/image";

import { joinURL } from "ufo";

export const getImage: ProviderGetImage = (src, { modifiers, baseURL } = {}) => {
  const operations: string[] = [];

  // Handle common modifiers
  if (modifiers) {
    if (modifiers.width) {
      operations.push(`w_${modifiers.width}`);
    }
    if (modifiers.height) {
      operations.push(`h_${modifiers.height}`);
    }
    if (modifiers.quality) {
      operations.push(`q_${modifiers.quality}`);
    }
    if (modifiers.format) {
      operations.push(`f_${modifiers.format}`);
    }
  }

  // For DummyJSON, we might need to handle the src differently
  // DummyJSON images are typically accessed directly
  const imageUrl = src.startsWith("http") ? src : joinURL(baseURL || "https://dummyjson.com", src);

  // If DummyJSON supports image transformations, apply them
  // Otherwise, return the original URL
  if (operations.length > 0) {
    // This is a hypothetical transformation syntax
    // Adjust based on DummyJSON's actual image transformation API
    return {
      url: `${imageUrl}?transform=${operations.join(",")}`,
    };
  }

  return {
    url: imageUrl,
  };
};
