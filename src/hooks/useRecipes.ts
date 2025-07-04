import { useContext, useState } from 'react';
import { RecipeContext } from '../context/RecipeContext';
import type { Recipe } from '../types/Recipe';

type Dificultad = 'fácil' | 'intermedio' | 'difícil' | '';

export const useRecipes = () => {
  const context = useContext(RecipeContext);
  if (context === undefined) {
    throw new Error('useRecipes debe ser usado dentro de un RecipeProvider');
  }

  
  const [difficultyFilter, setDifficultyFilter] = useState<Dificultad>('');

  const filterByDifficulty = (): Recipe[] => {
    if (!difficultyFilter) return context.recetas;
    return context.recetas.filter(
      receta => receta.dificultad.toLowerCase() === difficultyFilter
    );
  };

  return {
    ...context,
    difficultyFilter,
    setDifficultyFilter,
    filterByDifficulty,
  };
};
