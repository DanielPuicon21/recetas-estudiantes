import React from 'react';
import { useRecipes } from '../hooks/useRecipes';

const StatsPage: React.FC = () => {
  const { recetas } = useRecipes();

  const totalRecetas = recetas.length;

  // Recetas por categoría
  const recetasPorCategoria: Record<string, number> = {};
  recetas.forEach(({ categoria }) => {
    const cat = categoria.trim().toLowerCase();
    recetasPorCategoria[cat] = (recetasPorCategoria[cat] || 0) + 1;
  });

  // Ordenar categorías por cantidad descendente
  const categoriasOrdenadas = Object.entries(recetasPorCategoria).sort((a, b) => b[1] - a[1]);

  // Receta más popular
  const recetaPopular =
    recetas.length > 0
      ? recetas.reduce((max, r) => (r.valoracion > max.valoracion ? r : max), recetas[0])
      : null;

  return (
    <div className="container py-4">
      <section className="text-center mb-5">
        <h1 className="display-4 mb-2">📊 Estadísticas de Recetas</h1>
        <p className="lead text-muted">Resumen general del contenido disponible</p>
      </section>

      {totalRecetas === 0 ? (
        <div className="alert alert-warning text-center">
          Aún no hay recetas registradas en la plataforma.
        </div>
      ) : (
        <section className="stats-section mb-5">
          <div className="row justify-content-center align-items-stretch g-4">
            {/* Total de recetas */}
            <div className="col-12 col-sm-6 col-lg-4 d-flex">
              <div className="card flex-fill shadow-sm border-0 text-center">
                <div className="card-body d-flex flex-column justify-content-center align-items-center py-5">
                  <h2 className="display-4 fw-bold mb-2">{totalRecetas}</h2>
                  <p className="mb-0 text-muted fs-5">Recetas registradas</p>
                </div>
              </div>
            </div>

            {/* Recetas por categoría */}
            <div className="col-12 col-sm-6 col-lg-4 d-flex">
              <div className="card flex-fill shadow-sm border-0 text-center">
                <div className="card-body d-flex flex-column justify-content-center align-items-center py-5">
                  <h5 className="card-title mb-4 fs-4">Recetas por Categoría</h5>
                  <ul className="list-group list-group-flush w-100">
                    {categoriasOrdenadas.map(([cat, count]) => (
                      <li key={cat} className="list-group-item d-flex justify-content-between align-items-center px-4">
                        <span className="text-capitalize fs-6">{cat}</span>
                        <span className="badge bg-primary rounded-pill fs-6">{count}</span>
                      </li>
                    ))}
                    {categoriasOrdenadas.length === 0 && (
                      <li className="list-group-item text-muted">No hay categorías</li>
                    )}
                  </ul>
                </div>
              </div>
            </div>

            {/* Receta más popular */}
            <div className="col-12 col-sm-12 col-lg-4 d-flex">
              <div className="card flex-fill shadow-sm border-0 text-center">
                <div className="card-body d-flex flex-column justify-content-center align-items-center py-5">
                  <h5 className="card-title mb-4 fs-4">Receta más Popular</h5>
                  {recetaPopular ? (
                    <>
                      <h6 className="mb-3 fs-5">{recetaPopular.nombre}</h6>
                      <span className="badge bg-success mb-3 fs-6">
                        ⭐ {recetaPopular.valoracion.toFixed(1)}
                      </span>
                      <p className="mb-0 text-muted text-capitalize fs-6">{recetaPopular.categoria}</p>
                    </>
                  ) : (
                    <p className="text-muted">No disponible</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default StatsPage;
