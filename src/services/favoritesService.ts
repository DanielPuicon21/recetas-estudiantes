// src/services/favoritesService.ts
const FAVORITES_KEY = "favoriteRecipes";

export function getFavoriteIds(): number[] {
  const data = localStorage.getItem(FAVORITES_KEY);
  if (!data) return [];
  try {
    return JSON.parse(data) as number[];
  } catch {
    return [];
  }
}

export function addFavoriteId(id: number): void {
  const favorites = getFavoriteIds();
  if (!favorites.includes(id)) {
    favorites.push(id);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  }
}

export function removeFavoriteId(recipeId: number): void {
  const favorites = getFavoriteIds().filter((favId) => favId !== recipeId);
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
}
