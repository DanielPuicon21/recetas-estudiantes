/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useState, useEffect } from 'react';
// import type { ReactNode } from 'react';
import type { Recipe } from '../types/Recipe';
import recetasData from '../data/recetas.json';
import * as favoritesService from '../services/favoritesService';

interface RecipeContextType {
  recetas: Recipe[];
  favoritos: Recipe[];
  favoritosIds: number[];
  addToFavoritos: (recipe: Recipe) => void;
  removeFromFavoritos: (id: number) => void;
  isFavorito: (id: number) => boolean;
  addReceta: (receta: Omit<Recipe, 'id'>) => void;
}

export const RecipeContext = createContext<RecipeContextType | undefined>(undefined);


export const RecipeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [recetas, setRecetas] = useState<Recipe[]>(recetasData.recetas as Recipe[]);
  const [favoritos, setFavoritos] = useState<number[]>(() => favoritesService.getFavoriteIds());

  // Cargar favoritos desde localStorage al montar
  useEffect(() => {
    setFavoritos(favoritesService.getFavoriteIds());
  }, []);

  // Guardar favoritos en localStorage cuando cambian
  useEffect(() => {
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoritos));
  }, [favoritos]);

  const addToFavoritos = (recipe: Recipe) => {
    favoritesService.addFavoriteId(recipe.id);
    setFavoritos(favoritesService.getFavoriteIds());
  };

  const removeFromFavoritos = (id: number) => {
    favoritesService.removeFavoriteId(id);
    setFavoritos(favoritesService.getFavoriteIds());
  };

  const isFavorito = (id: number) => {
    return favoritos.includes(id);
  };

  const addReceta = (nuevaReceta: Omit<Recipe, 'id'>) => {
    const newId = Math.max(...recetas.map(r => r.id)) + 1;
    const receta: Recipe = {
      ...nuevaReceta,
      id: newId
    };
    setRecetas(prev => [...prev, receta]);
  };

  return (
    <RecipeContext.Provider value={{
      recetas,
      favoritos: recetas.filter(r => favoritos.includes(r.id)),
      favoritosIds: favoritos,
      addToFavoritos,
      removeFromFavoritos,
      isFavorito,
      addReceta,
    }}>
      {children}
    </RecipeContext.Provider>
  );
};

