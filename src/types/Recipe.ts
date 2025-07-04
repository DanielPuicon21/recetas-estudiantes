export interface Recipe {
  id: number;
  nombre: string;
  imagen: string;
  ingredientes: string[];
  pasos: string[];
  tiempo: number;
  dificultad: 'fácil' | 'intermedio' | 'difícil';
  categoria: string;
  valoracion: number;
  porciones: number;
}

export interface RecipeFormData {
  nombre: string;
  ingredientes: string;
  pasos: string;
  tiempo: number;
  dificultad: 'fácil' | 'intermedio' | 'difícil';
  categoria: string;
  porciones: number;
}

export interface RecipeFormErrors {
  nombre?: string;
  ingredientes?: string;
  pasos?: string;
  tiempo?: string;
  dificultad?: string;
  categoria?: string;
  porciones?: string;
}