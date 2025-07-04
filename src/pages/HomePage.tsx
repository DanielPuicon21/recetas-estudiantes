import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useRecipes } from '../hooks/useRecipes';
import RecipeCard from '../components/RecipeCard';
import SearchBar from '../components/SearchBar';

const HomePage: React.FC = () => {
  const {
    recetas,
    difficultyFilter,
    setDifficultyFilter,
    filterByDifficulty
  } = useRecipes();

  const [textoBusqueda, setTextoBusqueda] = useState('');

  // 🔍 Recetas filtradas por búsqueda y dificultad
  const recetasFiltradas = useMemo(() => {
    return filterByDifficulty().filter(receta =>
      receta.nombre.toLowerCase().includes(textoBusqueda.toLowerCase())
    );
  }, [recetas, difficultyFilter, textoBusqueda]);

  // ⭐ Recetas más valoradas (Top 3)
  const recetasDestacadas = useMemo(() => {
    return [...recetas]
      .sort((a, b) => b.valoracion - a.valoracion)
      .slice(0, 3);
  }, [recetas]);

  // ⚡ Recetas rápidas (menos de 20 minutos)
  const recetasRapidas = useMemo(() => {
    return recetas.filter(receta => receta.tiempo <= 20).slice(0, 3);
  }, [recetas]);

  // 📊 Estadísticas
  const promedioTiempo = useMemo(() => {
    return recetas.length > 0
      ? Math.round(recetas.reduce((acc, r) => acc + r.tiempo, 0) / recetas.length)
      : 0;
  }, [recetas]);

  return (
    <div className="home-page">
      {/* 🌟 Hero */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">🍳 Recetas para Estudiantes</h1>
          <p className="hero-subtitle">
            Deliciosas recetas fáciles, rápidas y económicas para estudiantes universitarios
          </p>
          <div className="hero-buttons">
            <Link to="/recetas" className="cta-button primary">
              Explorar Recetas
            </Link>
            <Link to="/crear" className="cta-button secondary">
              Crear Mi Receta
            </Link>
          </div>
        </div>
      </section>

      {/* 🔎 Filtros */}
      <section className="filter-section">
        <div className="filters-wrapper">
          <div className="search-bar-container">
            <SearchBar onSearch={setTextoBusqueda} />
          </div>
          <div className="difficulty-filter-container">
            <select
              className="form-select"
              value={difficultyFilter}
              onChange={(e) =>
                setDifficultyFilter(e.target.value as 'fácil' | 'intermedio' | 'difícil' | '')
              }
            >
              <option value="">Todas las Dificultades</option>
              <option value="fácil">Fácil</option>
              <option value="intermedio">Intermedio</option>
              <option value="difícil">Difícil</option>
            </select>
          </div>
        </div>
      </section>

      {/* 📋 Resultados de búsqueda */}
      <section className="results-section">
        <h2 className="section-title">🔎 Resultados de Búsqueda</h2>
        <div className="recipes-grid">
          {recetasFiltradas.length > 0 ? (
            recetasFiltradas.map(receta => (
              <RecipeCard key={receta.id} recipe={receta} />
            ))
          ) : (
            <p className="no-results-text">No se encontraron recetas.</p>
          )}
        </div>
      </section>

      {/* ⭐ Más valoradas */}
      <section className="featured-section">
        <h2 className="section-title">⭐ Recetas Más Valoradas</h2>
        <div className="recipes-grid">
          {recetasDestacadas.map(receta => (
            <RecipeCard key={receta.id} recipe={receta} />
          ))}
        </div>
        <div className="section-footer">
          <Link to="/recetas" className="view-all-link">
            Ver todas las recetas →
          </Link>
        </div>
      </section>

      {/* ⚡ Rápidas */}
      <section className="quick-section">
        <h2 className="section-title">⚡ Recetas Rápidas</h2>
        <p className="section-subtitle">Perfectas para cuando tienes poco tiempo</p>
        <div className="recipes-grid">
          {recetasRapidas.map(receta => (
            <RecipeCard key={receta.id} recipe={receta} />
          ))}
        </div>
      </section>

      {/* 📊 Estadísticas */}
      <section className="stats-section">
        <div className="stats-container">
          <div className="stat-item">
            <span className="stat-number">{recetas.length}</span>
            <span className="stat-label">Recetas</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">{promedioTiempo}</span>
            <span className="stat-label">Min Promedio</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">
              {recetas.filter(r => r.dificultad === 'fácil').length}
            </span>
            <span className="stat-label">Recetas Fáciles</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
